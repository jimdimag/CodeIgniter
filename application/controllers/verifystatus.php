<?php
/* Controller to verify the login information is correct and to check the datatbase for the user*/

if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class VerifyStatus extends CI_Controller{

    function __construct()
    {
        parent::__construct();
        $this->load->model('user','',TRUE);
    }
    
    function index()
    {    
        $this->check_status();
        //GOTO RESTRICTED AREAS
        redirect('home', 'refresh');
    
    } //END OF INDEX FUNCTION
    
    
} // END OF VERIFYStatus CLASS
?>