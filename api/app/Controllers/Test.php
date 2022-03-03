<?php

namespace App\Controllers;


class Test extends APIController
{

    function output(){

        // Check Authorization
        $auth_response = $this->need_login();
        if($auth_response !== true){
            return $auth_response;
        }
        
        $result = "Hello, this is from CodeIgniter 4 API";
        return $this->response->setJSON($result);
    }
}
