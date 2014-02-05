<?php
require_once ('../db.php');
require_once ('../supply.php');
require_once ('../amazon/getMatchingProduct.php');//amazonmws
require_once ('../amazon/amazonPricingMWS.php');
$conn = db_connect();
session_start();

$userId = $_SESSION['userId'];

$isbn = $_POST['isbn'];
$doNotBuy = false;
$num_rows = 0;
$totalQtyLimit = 0;
$maxQtyLimit = 0;
$firstOfMonth = date("Y-m") . "-01";
$isbn = str_replace('-','',$isbn);
// check to see if the isbn is a "problem" isbn or not
$problem = $conn->query("select isbn, note from problem where isbn = '$isbn'");
if($problem) {
	$num_rows = $problem->num_rows;
}
if($num_rows > 0) {
	$problem_row = $problem->fetch_assoc();
		$problem_message = stripslashes($problem_row['note']);
	$doNotBuy = true; // disable the buy button if the book should not be bought due to problems
	
}

//buyback season algorithm
$today = date("m-d");
$buybackSeason = false;
if(($today >= "04-23" && $today <= "05-30") || ($today >= "08-15" && $today <= "09-10") || ($today >= "12-06" && $today <= "12-31") || ($today >= "01-01" && $today <= "01-15"))
{
	$buybackSeason = true;
}

$bookResult = $conn->query("select title from book where isbn13 = '$isbn'");
if($bookResult){
	$num_rows = $bookResult->num_rows;
}

if($num_rows >= 1)
{
	//retrieve amazon data
	$parsed_xml = MatchingProduct_xml($isbn);//MatchingProduct_xml
	$amazonResult = array();
	$itemCondition = "any";
	
	$current = $parsed_xml->GetMatchingProductForIdResult->Products->Product;//ListMatchingProductsResult
	
	
		if(isset($parsed_xml->GetMatchingProductForIdResult->Products, $current, $current->AttributeSets)) {
			//foreach($current as $offer1){
			  $offer1=$current;
				if(stristr($offer1->AttributeSets->children('ns2', true)->ItemAttributes->Author, "Cram101") != true &&
				   stristr($offer1->AttributeSets->children('ns2', true)->ItemAttributes->ProductGroup, "Book") == true &&
				   stristr($offer1->AttributeSets->children('ns2', true)->ItemAttributes->Format, "Kindle eBook") != true)
				   {
			$asin = $offer1->Identifiers->MarketplaceASIN->ASIN;
			$amazonResult = array(
				'Title' => $offer1->AttributeSets->children('ns2', true)->ItemAttributes->Title,
				'SalesRank' => $offer1->SalesRankings->SalesRank->Rank,
				'Binding' => $offer1->AttributeSets->children('ns2', true)->ItemAttributes->Binding,
				'Weight' => ($offer1->AttributeSets->children('ns2', true)->ItemAttributes->ItemDimensions->Weight),
				'ListPrice' => $offer1->AttributeSets->children('ns2', true)->ItemAttributes->ListPrice->Amount,
				'ImageURL' => str_replace('SL75','SL200',$offer1->AttributeSets->children('ns2', true)->ItemAttributes->SmallImage->URL),
				'DetailURL' => ("http://www.amazon.com/gp/product/" . $asin),//$current->AttributeSets->children('ns2', true)->ItemAttributes->SmallImage->URL,
				
				);
			
			} // end of if
			//} end of foreach 
		} else {
			$amazonResult = array(
				'Title' => null,
				'SalesRank' => null,
				'ListPrice' => 0,
				
				);
		}
			//retrieve amazon data
			$price_xml = amazonPrice_xml($asin, $itemCondition);
			
			$currentPrice = $price_xml ->GetLowestOfferListingsForASINResult->Product->LowestOfferListings;
				 foreach($currentPrice->LowestOfferListing as $offer){
						$offerArray[$y] = str_replace('$','',$offer->Price->ListingPrice->Amount);
						$y++;
						
				}
				if($y>=1){
				$lowestAmazonPrice = min($offerArray);
			} else {
				$lowestAmazonPrice = array_sum($offerArray);
			}

	//update list price in book table
	$conn->query("UPDATE book SET title = " . addslashes($amazonResult['Title']) . ", listed_price = " . $amazonResult['ListPrice'] . " WHERE isbn13 = '$isbn'");
}
else
{
	//retrieve amazon data
	$parsed_xml = MatchingProduct_xml($isbn);//MatchingProduct_xml
	$amazonResult = array();

	$current = $parsed_xml->GetMatchingProductForIdResult->Products->Product;
	$asin = $current->Identifiers->MarketplaceASIN->ASIN;
	
	$itemCondition = "any";
	if(isset($parsed_xml->GetMatchingProductForIdResult->Products, $current, $current->AttributeSets)) {
			//foreach($current as $offer1){
			$offer1=$current;
				if(stristr($offer1->AttributeSets->children('ns2', true)->ItemAttributes->Author, "Cram101") != true &&
				   stristr($offer1->AttributeSets->children('ns2', true)->ItemAttributes->ProductGroup, "Book") == true &&
				   stristr($offer1->AttributeSets->children('ns2', true)->ItemAttributes->Format, "Kindle eBook") != true)
				   {
			$asin = $offer1->Identifiers->MarketplaceASIN->ASIN;
			$amazonResult = array(
				'Title' => $offer1->AttributeSets->children('ns2', true)->ItemAttributes->Title,
				'Author' => $offer1->AttributeSets->children('ns2', true)->ItemAttributes->Author,
				'Binding' => $offer1->AttributeSets->children('ns2', true)->ItemAttributes->Binding,
				'Edition' => $offer1->AttributeSets->children('ns2', true)->ItemAttributes->Edition,
				'Weight' => ($offer1->children('ns2', true)->ItemAttributes->PackageDimensions->Weight / 100),
				'Publisher' => $offer1->AttributeSets->children('ns2', true)->ItemAttributes->Publisher,
				'PublishDate' => $offer1->AttributeSets->children('ns2', true)->ItemAttributes->PublicationDate,
				'Binding' => $offer1->AttributeSets->children('ns2', true)->ItemAttributes->Binding,
				'SalesRank' => $offer1->SalesRankings->SalesRank->Rank,
				'ListPrice' => $offer1->AttributeSets->children('ns2', true)->ItemAttributes->ListPrice->Amount,
				'ImageURL' => $offer1->AttributeSets->children('ns2', true)->ItemAttributes->SmallImage->URL,
				'DetailURL' => ("http://www.amazon.com/gp/product/" . $asin),//str_replace('SL75','SL200',$current->AttributeSets->children('ns2', true)->ItemAttributes->SmallImage->URL)
				//'LowestPrice' => str_replace('$','',$current->Offers->Offer->OfferListing->Price->FormattedPrice)
				);
			
			} // end of if
			//} end of foreach 
				//retrieve amazon data
			$price_xml = amazonPrice_xml($asin, $itemCondition);
			
			$currentPrice = $price_xml ->GetLowestOfferListingsForASINResult->Product->LowestOfferListings;
				 foreach($currentPrice->LowestOfferListing as $offer){
						$offerArray[$y] = str_replace('$','',$offer->Price->ListingPrice->Amount);
						$y++;
						
				}
				$lowestAmazonPrice = min($offerArray);
			
	} else {
		$amazonResult = array(
				'Title' => null,
				'SalesRank' => null,
				'ListPrice' => 0,
				);
	}

	//update list price in book table
	$conn->query("INSERT INTO book (isbn13, author, title, edition, weight, publisher, binding, listed_price, pub_date, asin)
		     VALUES ('$isbn', '" . addslashes($amazonResult['Author']) . "', '" . addslashes($amazonResult['Title']) . "', '" . $amazonResult['Edition'] . "',
		     '" . $amazonResult['Weight'] . "', '" . addslashes($amazonResult['Publisher']) . "', '" . $amazonResult['Binding'] . "',
		     '" . $amazonResult['ListPrice'] . "', '" . $amazonResult['PublishDate'] . "', '$asin')");
}

$amazonResult['ListPrice'] = str_replace('$','',$amazonResult['ListPrice']);

//gather data from guides
$follett_result = $conn->query("select usedbuying_price, name from follette_title where isbn13 = '$isbn'");
$row = $follett_result->fetch_assoc();
$follett = array('usedbuyingprice' => $row['usedbuying_price'], 'title' => $row['name']);
	
$amtext_result = $conn->query("select price, class_code from amtext where isbn13 = '$isbn' ");
$row = $amtext_result->fetch_assoc();
$amtext = array('price' => $row['price'], 'classcode' => $row['class_code']);

$tichenor_result = $conn->query("select price, activity from tichenor where isbn13 = '$isbn' ");
$row = $tichenor_result->fetch_assoc();
$tichenor = array('price' => $row['price'], 'activity' => $row['activity']);

$nebraska_result = $conn->query("select price from nebraska where isbn13 = '$isbn' ");
$row = $nebraska_result->fetch_assoc();
$nebraska = array('price' => ($row['price']*.60));


//calculate best guide price (with commission)
$guide_prices = array('follett' => ((float)$follett['usedbuyingprice']),
					 'amtext' => ((float)$amtext['price']),
					  'tichenor' => ((float)$tichenor['price']),
					  'nebraska' => (float)$nebraska['price']
					  //'budgetext' => $budgetext['price']
					  );

$bestGuidePrice = max($guide_prices);

foreach ($guide_prices as $key => $val) {
	if ($val == max($guide_prices))
	{
		$bestGuide = $key;
	}
}

//grab quantity info from inv and inv_temp
$invTemp_result = $conn->query(" SELECT SUM(quantity) AS qty FROM inv_temp where isbn = '$isbn' ");
$row = $invTemp_result->fetch_assoc();
$invTemp = array('quantity' => $row['qty']);

$inv_result = $conn->query(" SELECT SUM(quantity) AS qty FROM inventory where isbn13 = '$isbn' ");
$row = $inv_result->fetch_assoc();
$inv = array('quantity' => $row['qty']);

$currentInvQty = $invTemp['quantity'] + $inv['quantity'];


//grab title and shorten it
if($amazonResult['Title']==""){
	$titleWords = explode(' ', ${$bestGuide}['title']);
	$shortTitle = $titleWords[0] . " " . $titleWords[1] . " " . $titleWords[2] . " " . $titleWords[3];
}else{
	$titleWords = explode(' ', $amazonResult['Title']);
	$shortTitle = $titleWords[0] . " " . $titleWords[1] . " " . $titleWords[2] . " " . $titleWords[3];
}



//qty limits algorithm insert here
include '../etc/buybackQtyLimits.php';

//calculate our max allowed purchase quantity
$maxQtyLimit = $totalQtyLimit - $currentInvQty;
if($maxQtyLimit < 0){
	$maxQtyLimit = 0;
	$doNotBuy = true;
}


//supply check algorithm
$supply = array(
			array( 	0 => false, //CD
					1 => false, //MathLab
					2 => false, //Access Card
					3 => false, //Access Code
					4 => false, //Passcard
					5 => false, //MyELT Card
					6 => false, //Passcode
					7 => false, //Infotrac
					8 => false, //Online Research Guide
					9 => false,  //OLC Card
					10 => false, //Custom Edition Books
					11 => false, //Cram101 Study Guides
					12=> false //Teacher Wraparound Editions
					),
			array( 	0 => false, //CD
					1 => false, //MathLab
					2 => false, //Access Card
					3 => false, //Access Code
					4 => false, //Passcard
					5 => false, //MyELT Card
					6 => false, //OLC Card
					7 => false, //Infotrac
					8 => false, //Online Research Guide
					9 => false,  //Passcode
					10 => false, //Custom Edition Books
					11=> false, //Cram101 Study Guides
					12=> false //Teacher Wraparound Editions
					)
);

//Follett supply algorithm
$follett = $follett['title'];
$amazon = $amazonResult['Title'];

$supply = supply($follett, $amazon);


//Price to Pay algorithm
if($buybackSeason)
{
	if(empty($bestGuidePrice))
	{
		$bookEdition = "Previous";

		switch ($amazonResult['SalesRank']) {
		case ($amazonResult['SalesRank'] < 1 || trim($amazonResult['SalesRank'])==='' || !isset($amazonResult['SalesRank']) || $amazonResult['SalesRank']=== null):
			$Price=((float) $lowestAmazonPrice) * 0.02;
			$payPrice = round($Price, 0);  //to round the price up or down to the nearest $
			break; 
		case ($amazonResult['SalesRank'] > 0 && $amazonResult['SalesRank'] <= 15000):
			$Price=((float) $lowestAmazonPrice) * 0.25;
			$payPrice = round($Price, 0); //to round the price up or down to the nearest $
			break;
		case ($amazonResult['SalesRank'] > 15000 && $amazonResult['SalesRank'] <= 30000):
			$Price=((float) $lowestAmazonPrice) * 0.24;
			$payPrice = round($Price, 0); //to round the price up or down to the nearest $
			break;
		case ($amazonResult['SalesRank'] > 30000 && $amazonResult['SalesRank'] <= 300000):
			$Price=((float) $lowestAmazonPrice) * 0.22;
			$payPrice = round($Price, 0);  //to round the price up or down to the nearest $
			break;
		case ($amazonResult['SalesRank'] > 300000 && $amazonResult['SalesRank'] <= 600000):
			$Price=((float) $lowestAmazonPrice) * 0.11;
			$payPrice = round($Price, 0);
			break;
		case ($amazonResult['SalesRank'] > 600000 && $amazonResult['SalesRank'] <= 1000000):
			$Price=((float) $lowestAmazonPrice) * 0.08;
			$payPrice = round($Price, 0);
			break;
		case ($amazonResult['SalesRank'] > 1000000 && $amazonResult['SalesRank'] <= 1500000):
			$Price=((float) $lowestAmazonPrice) * 0.06;
			$payPrice = round($Price, 0);
			break;
		case ($amazonResult['SalesRank'] > 1500000 && $amazonResult['SalesRank'] <= 2000000):
			$Price=((float) $lowestAmazonPrice) * 0.05;
			$payPrice = round($Price, 0);
			break;
		case ($amazonResult['SalesRank'] > 2000000 && $amazonResult['SalesRank'] <= 5000000):
			$Price=((float) $lowestAmazonPrice) * 0.04;
			$payPrice = round($Price, 0);
			break;
		case ($amazonResult['SalesRank'] > 5000000):
			$Price=((float) $lowestAmazonPrice) * 0.01;
			$payPrice = round($Price, 0);
			break;
		default:
	    	$Price=((float) $lowestAmazonPrice) * 0.02;
		    $payPrice = round($Price, 0);  //to round the price up or down to the nearest $
		    break;
		}

		if($Price < .61)
		{
			$Price = 0;
		}

	}
	else
	{
		$bookEdition = "Current";

		if($bestGuidePrice <= 2)
		{
			$Price = $bestGuidePrice * 0.66;
			$payPrice = round($Price, 0);  //to round the price up or down to the nearest $
		}
		else
		{
			$Price = $bestGuidePrice;
			$payPrice = round($Price, 0);  //to round the price up or down to the nearest $
		}
	}
}
else
{
	if(empty($bestGuidePrice))
	{
		$bookEdition = "Previous";

		switch ($amazonResult['SalesRank']) {
		case ($amazonResult['SalesRank'] < 1 || trim($amazonResult['SalesRank'])===''|| !isset($amazonResult['SalesRank']) || $amazonResult['SalesRank']=== null):
			$Price=((float) $lowestAmazonPrice) * 0.02;
			$payPrice = round($Price, 0); //to round the price up or down to the nearest $
			break; 
		case ($amazonResult['SalesRank'] > 0 && $amazonResult['SalesRank'] <= 15000):
			$Price=((float) $lowestAmazonPrice) * 0.15;
			$payPrice = round($Price, 0);  //to round the price up or down to the nearest $
			break;
		case ($amazonResult['SalesRank'] > 15000 && $amazonResult['SalesRank'] <= 30000):
			$Price=((float) $lowestAmazonPrice) * 0.11;
			$payPrice = round($Price, 0);  //to round the price up or down to the nearest $
			break;
		case ($amazonResult['SalesRank'] > 30000 && $amazonResult['SalesRank'] <= 300000):
			$Price=((float) $lowestAmazonPrice) * 0.10;
			$payPrice = round($Price, 0);  //to round the price up or down to the nearest $
			break;
		case ($amazonResult['SalesRank'] > 300000 && $amazonResult['SalesRank'] <= 600000):
			$Price=((float) $lowestAmazonPrice) * 0.09;
			$payPrice = round($Price, 0);
			break;
		case ($amazonResult['SalesRank'] > 600000 && $amazonResult['SalesRank'] <= 1000000):
			$Price=((float) $lowestAmazonPrice) * 0.08;
			$payPrice = round($Price, 0);
			break;
		case ($amazonResult['SalesRank'] > 1000000 && $amazonResult['SalesRank'] <= 1500000):
			$Price=((float) $lowestAmazonPrice) * 0.06;
			$payPrice = round($Price, 0);
			break;
		case ($amazonResult['SalesRank'] > 1500000 && $amazonResult['SalesRank'] <= 2000000):
			$Price=((float) $lowestAmazonPrice) * 0.05;
			$payPrice = round($Price, 0);
			break;
		case ($amazonResult['SalesRank'] > 2000000 && $amazonResult['SalesRank'] <= 5000000):
			$Price=((float) $lowestAmazonPrice) * 0.04;
			$payPrice = round($Price, 0);
			break;
		case ($amazonResult['SalesRank'] > 5000000):
			$Price=((float) $lowestAmazonPrice) * 0.01;
			$payPrice = round($Price, 0);
			break;
		default:
	    	$Price=((float) $lowestAmazonPrice) * 0.02;
		    $payPrice = round($Price, 0);  //to round the price up or down to the nearest $
		    break;
		}

		if($Price < .61)
		{
			$Price = 0;
		}
	}
	else
	{
		$bookEdition = "Current";
		if($bestGuidePrice <= 2)
		{
			$Price = $bestGuidePrice * 0.66;
			$payPrice = round($Price, 0);  //to round the price up or down to the nearest $
		}
		else
		{
			$Price = $bestGuidePrice;
			$payPrice = round($Price, 0); //to round the price up or down to the nearest $
		}
	}
}

//disable buy button?
if( $bookEdition == "Previous" && $Price < 1 ){
	$doNotBuy = true;
}

if ($doNotBuy || $maxQtyLimit < 1){
	$isMiss = true;
}else{
	$isMiss = false;
}


//update scan
if($isMiss){
	$conn->query(" UPDATE scans SET scans_miss = scans_miss + 1 WHERE user_id = '$userId' AND month = '$firstOfMonth' ");
	if($conn->affected_rows <= 0){
		$conn->query(" INSERT INTO scans (user_id, scans.`month`) VALUES ('$userId', '$firstOfMonth') ");
		$conn->query(" UPDATE scans SET scans_miss = scans_miss + 1 WHERE user_id = '$userId' AND month = '$firstOfMonth' ");
	}
}else{
	$conn->query(" UPDATE scans SET scans_hit = scans_hit + 1 WHERE user_id = '$userId'  AND month = '$firstOfMonth' ");
	if($conn->affected_rows <= 0){
		$conn->query(" INSERT INTO scans (user_id, scans.`month`) VALUES ('$userId', '$firstOfMonth') ");
		$conn->query(" UPDATE scans SET scans_hit = scans_hit + 1 WHERE user_id = '$userId'  AND month = '$firstOfMonth' ");
	}
}


 
$returnResults= array('payPrice' => number_format($Price, 2, '.', ''),
					'title' => $shortTitle,
					'edition' => $bookEdition,
					'binding' => (string)$amazonResult['Binding'],
					'salesRank' => number_format((string)$amazonResult['SalesRank']),
					'ImageURL' => (string)$amazonResult['ImageURL'],
					'DetailURL' => (string)$amazonResult['DetailURL'],
					'doNotBuy' => $doNotBuy,
					'currentInvQty' => $currentInvQty,
					'totalQtyLimit' => $totalQtyLimit,
					'maxQtyLimit' => $maxQtyLimit,
					'supply' => $supply,
					'message' => $problem_message,
					'asin' =>(string)$asin
					);

$conn->close();

echo json_encode($returnResults);
?>
