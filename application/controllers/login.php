<?php
/* Controller page for the log in area*/
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
class Login extends CI_Controller {

 function __construct()
 {
   parent::__construct();
 }
 
 function index($page='login_view') {
        if ( ! file_exists('application/views/'.$page.'.php'))
	{
		// Whoops, we don't have a page for that!
		show_404();
	}    
 $data['title'] = ucfirst($page);
   $this->load->helper(array('form'));
   $this->load->helper('html');
   $this->load->library('javascript');
   
   $this->load->view('templates/header', $data);
   $this->load->view($page, $data);
   
   $this->load->view('templates/footer', $data);
    
    } // END OF INDEX FUNCTION
 
} // END OF LOGIN CLASS
?>
