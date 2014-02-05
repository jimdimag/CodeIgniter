<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
class Buyback extends CI_Controller {

 function __construct()
 {
   parent::__construct();
 }
function index($page='buybackmws') {
        if ( ! file_exists('application/views/'.$page.'.php'))
	{
		// Whoops, we don't have a page for that!
		show_404();
	}
        if($this->session->userdata('logged_in')) {
            $session_data=$this->session->userdata('logged_in');
            
            $data=array('username' =>$session_data['username'],
                        'user_type_id'=> $session_data['user_type_id'],
                        'title'=>ucfirst($page)
                        );
 
   $this->load->helper(array('form','html', 'function', 'amazon'));
   
   
   $this->load->view('templates/header', $data);
   $this->load->view($page, $data);
   
   $this->load->view('templates/footer', $data);
    
 }
 
}
}
 ?>