<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
session_start();
if(!isset($id)){
	redirect('login','refresh');
}elseif($user_type_id < 2){
	redirect('login','refresh');
}

class Priceprocess extends CI_Controller {
         function __construct()
    {
        parent::__construct();
        $this->load->model('user','',TRUE);
        
    }
    
    
    
} //END OF PRICEPROCESS CLASS