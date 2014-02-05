<?php
/*Model for the queries to the database*/
Class User extends CI_Model
{
    
    //function to check user credentials
    function login($username, $password)
    {
        $this->db->select('user_id,username, password, user_type_id');
        $this->db->from('users');
        $this->db->where('username', $username);
        $this->db->where('password',sha1($password));
        $this->db->limit(1);
        
        $query=$this->db->get();
        
        if($query->num_rows()==1)
        {
            return $query->result();
        } else
        {
            return false;
        }
    } // END OF LOGIN FUNCTION
    
    
    //FUNCTION TO SEE THE STATUS OF AMAZON
    function get_status() {
        $this->db->select('*');
        $this->db->from('amz');
        $this->db->where('active',1);
        
        $query = $this->db->get();
        
        if($query->num_rows()==1) {
            return $query->result();
        }else  {
            return false;
        }
    } //END OF GET_STATUS FUNCTION
    
    //function to get the books title
    /*function get_title($isbn) {
       $this->db->select('title');
        $this->db->from('book');
        $this->db->where('isbn13', $isbn);
        
        $query = $this->db->get();
        if($query->num_rows()==1)
        {
            return $query->result();
        } else
        {
            return false;
        }
        
    }*/  //END OF GET_TITLE FUNCTION
}  //END OF CLASS
?>