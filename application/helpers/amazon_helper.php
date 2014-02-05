<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('basic')){
    
    function basic($isbn){
        
        $CI = & get_instance();
	$CI->load->model('amz','',TRUE);
        $parsed_xml=$CI->amz->amazon_xml($isbn);
        
         if($parsed_xml)
        {
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
                        $CI->session->set_userdata('amazon',$amazonResult);
                } // END OF ISSET
                return TRUE;
        
        }else {
                
            return false;
        }
    
    }  //END OF AMAZON FUNCTION
}

?>