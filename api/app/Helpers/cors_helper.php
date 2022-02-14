<?php
use Config\Services;

if(!function_exists('enable_cors_header')){

    function enable_cors_header($domains = array()){

        $headers = array();

        $domain = $_SERVER['HTTP_HOST'];

        if(isset($_SERVER['HTTP_ORIGIN'])){
            $domain = $_SERVER['HTTP_ORIGIN'];
        }
        
        // Whitlist domains
        $tmp_domains = [
            'localhost',
            'http://localhost:8080',
            'http://localhost:8080/',
        ];

        if(empty($domains)){
            $domains = $tmp_domains;
        }

        $allow_domain = '';

        if(in_array($domain,$domains)){

            $allow_domain = $domain;
            header('Access-Control-Allow-Origin: '.$allow_domain);
            header('Access-Control-Allow-Credentials: true');
            header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Access-Control-Requested-Method, Authorization, Cookie");
            // header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PATCH, PUT, DELETE");

            // $headers['Access-Control-Allow-Origin'] = $allow_domain;
            // $headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

            // return $headers;

        }

        

        $method = $_SERVER['REQUEST_METHOD'];
        if($method == "OPTIONS"){
            $response = Services::response();
            $response->setStatusCode("200")->send();
            die();
        }

        return $headers;
    }
}
?>