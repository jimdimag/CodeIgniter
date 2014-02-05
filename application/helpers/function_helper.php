<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

    if (!function_exists('check_status')){

function check_status()
    {
	$CI = & get_instance();
	$CI->load->model('user','',TRUE);
        $result=$CI->user->get_status();
            if($result)
        {
            $status_array=array();
            foreach($result as $row)
            {
                $status_array=array(
                    'source' => $row->status,
                    'current' => $row->id
                    );
               
            if ($status_array['current'] == 1) {
		$status_array['current'] = "Live";
	} else {
		$status_array['current'] = "Amazon is Down";
	}
                    
                $CI->session->set_userdata('status',$status_array);
            }
            return TRUE;
        
        
        }
        else
        {
                
            return false;
        }
    } 
    }// END OF CHECK_STATUS FUNCTION
