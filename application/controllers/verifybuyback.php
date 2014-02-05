<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Verifybuyback extends CI_Controller {
         function __construct()
    {
        parent::__construct();
        $this->load->model('amz','',TRUE);
        $this->load->helper('amazon');
    }
    
    function title()
    {
        $this->load->library('form_validation');
        
        $this->form_validation->set_rules('isbn', 'ISBN','trim|required|xss_clean|callback_title_check' );
        
    if($this->form_validation->run('title')==FALSE)
    {
        //Field validation failed.  User redirected to login page
     $this->load->view('buybackmws');

    }
    else
    {
        //GOTO RESTRICTED AREAS
        redirect('buybackmws', 'refresh');
    }
    }
    
    function title_check()
    {
        //Field validation succeeded.  Validate against database
        $isbn=$this->input->post('isbn');
        
        //QUERY AMAZON FOR THE INFORMATION
        
        $result = basic($isbn);
       
        if($this->session->userdata('amazon'))
        {
         $sess_array = array();
            $result=$this->session->userdata('amazon');
            
                $sess_array=array(
                    'title'=>$result['Title'],
                    'rank'=>$result['SalesRank'],
                    
                ); 
               /* $this->session->set_userdata('title',$sess_array);
           $this->load->view('buybackmws', $sess_array);
            return TRUE;*/
               echo json_encode($sess_array);
        }
        else
        {
            $this->form_validation->set_message('get_title', 'Invalid ISBN number');
            return false;
        }
    }
    
    } //END OF BUYBACK
    
?>