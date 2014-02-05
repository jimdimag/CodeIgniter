<?php
/*Model for the queries to the database*/
Class Amz extends CI_Model
{
var $AWS_ACCESS_KEY_ID = 'AKIAJRC2IR77ZZPPX4DQ';
var $AWS_SECRET_ACCESS_KEY = '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';
var $MERCHANT_ID = 'AGGI18ZJ4XBT0';
var $MARKETPLACE_ID = 'ATVPDKIKX0DER';
  
/*define('AWS_ACCESS_KEY_ID', 'AKIAJRC2IR77ZZPPX4DQ');
define('AWS_SECRET_ACCESS_KEY', '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');
define ('MERCHANT_ID', 'AGGI18ZJ4XBT0');
define ('MARKETPLACE_ID', 'ATVPDKIKX0DER');*/

    function amazon_xml($searchTerm) {
	
	$params = array(
		'AWSAccessKeyId' => "AKIAJRC2IR77ZZPPX4DQ",//$AWS_ACCESS_KEY_ID,
		'Action' => "GetMatchingProductForId",
		'SellerId' => "AGGI18ZJ4XBT0",//$MERCHANT_ID,
		'SignatureMethod' => "HmacSHA256",
		'SignatureVersion' => "2",
		'Timestamp'=> gmdate("Y-m-d\TH:i:s.\\0\\0\\0\\Z", time()),
		'Version'=> "2011-10-01",
		'MarketplaceId' => "ATVPDKIKX0DER",//$MARKETPLACE_ID,
		'IdType' => "ISBN",
		'IdList.Id.1'=> $searchTerm
		);
		

/*foreach ($searchTerm as $key=>$val) {
	
     $params['IdList.Id.'.$key] = $val;		
} *///end of foreach		
		
	
	
	// Sort the URL parameters
	$url_parts = array();
	foreach(array_keys($params) as $key)
		$url_parts[] = $key . "=" . str_replace('%7E', '~', rawurlencode($params[$key]));
	sort($url_parts);

	// Construct the string to sign
	$url_string = implode("&", $url_parts);
	$string_to_sign = "GET\nmws.amazonservices.com\n/Products/2011-10-01\n" . $url_string;

	// Sign the request
	$signature = hash_hmac("sha256", $string_to_sign,"7GE05DtmaumknfRAftaLRWN1vAvpv1RUk34J1iQT", TRUE);//$AWS_SECRET_ACCESS_KEY

	// Base64 encode the signature and make it URL safe
	$signature = urlencode(base64_encode($signature));

	$url = "https://mws.amazonservices.com/Products/2011-10-01" . '?' . $url_string . "&Signature=" . $signature;

	
	$ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    $response = curl_exec($ch);
    
    	$parsed_xml = simplexml_load_string($response);
//print_r($parsed_xml); die;	
	return ($parsed_xml);
    } //END OF AMAZON_XML FUNCTION
} // END OF CLASS