<?php
/* Controller to verify the login information is correct and to check the datatbase for the user*/

if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class VerifyLogin extends CI_Controller{

    function __construct()
    {
        parent::__construct();
        $this->load->model('user','',TRUE);
    }
    
    function index()
    {
        $this->load->library('form_validation');
        
        $this->form_validation->set_rules('username', 'Username','trim|required|xss_clean' );
        $this->form_validation->set_rules('password', 'Password', 'trim|required|xss_clean|callback_check_database');
        
    if($this->form_validation->run()==FALSE)
    {
        //Field validation failed.  User redirected to login page
     $this->load->view('login_view');

    }
    else
    {
        //GOTO RESTRICTED AREAS
        redirect('home', 'refresh');
        
    }
    } //END OF INDEX FUNCTION
    
    function check_database($password)
    {
        //Field validation succeeded.  Validate against database
        $username=$this->input->post('username');
        
        //QUERY THE DATABASE
        $result=$this->user->login($username, $password);
        
        if($result)
        {
            $sess_array=array();
            foreach($result as $row)
            {
                $sess_array=array(
                    'id'=>$row->user_id,
                    'username'=>$row->username,
                    'user_type_id'=>$row->user_type_id
                );
                $this->session->set_userdata('logged_in',$sess_array);
            }
            return TRUE;
        }
        else
        {
            $this->form_validation->set_message('check_database', 'Invalid Username or Password');
            return false;
        }
    } // END OF CHECK_DATABASE FUNCTION
} // END OF VERIFYLOGIN CLASS
?>