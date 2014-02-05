<?php
$config = array(
            'title'=>array(
                    array(
                    'filed'=>'isbn',
                    'label' => 'Isbn',
                    'rules' => 'trim|required|xss_clean|callback_title_check'
                    )
            )
) //END OF CONFIG ARRAY

?>