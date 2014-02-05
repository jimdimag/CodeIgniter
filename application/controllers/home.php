<?php
/*Controller for the home page after login is successful*/
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
session_start();

class Home extends CI_Controller
    {
         function __construct()
    {
        parent::__construct();
        
        
    }
    
    function index($page='home_view') {
        if ( ! file_exists('application/views/'.$page.'.php'))
	{
		// Whoops, we don't have a page for that!
		show_404();
	}    
    $this->load->helper('function');
        if($this->session->userdata('logged_in')) {
            $status = check_status();
            $session_data=$this->session->userdata('logged_in');
            $status_data = $this->session->userdata('status'); 
            $data=array('username' =>$session_data['username'],
                        'user_type_id'=> $session_data['user_type_id'],
                        'title'=>ucfirst($page),
                        'status'=>$status_data['current']
                        );
            
            $this->load->helper('html');
            
            $this->load->view('templates/header', $data);
            $this->load->view($page,$data);
            
   $this->load->view('templates/footer', $data);
        } else {
            redirect('login','refresh');
        }
    }  //END OF INDEX FUNCTION
    
    function logout() {
        $this->session->unset_userdata('logged_in');
        session_destroy();
        redirect('home', 'refresh');
    }  //END OF LOGOUT FUNCTION
}  //END OF HOME CLASS
?>