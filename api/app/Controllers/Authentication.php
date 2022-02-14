<?php

namespace App\Controllers;

use Firebase\JWT\JWT;

class Authentication extends BaseController
{

    public function index()
    {
        return $this->login();
    }

    public function login(){
        

        enable_cors_header();

        $request = service('request');

        $post = $request->getVar();

        $data = array(
            'username'      =>  isset($post->username)?$post->username:'-',
        );

        $access_token = $this->gen_access_token($data);
        $refresh_token = $this->gen_refresh_token($data);


        

        // store a cookie value
        set_cookie(REFRESH_TOKEN_NAME, json_encode($refresh_token['token']), $refresh_token['duration'],"","/","",false,true);


        // get cookie value
        // array_debug(get_cookie("username"));

        // remove cookie value
        // delete_cookie("username");

        // 403 Forbidden
        // $this->response->setStatusCode(403);
        return $this->response->setJSON($access_token);
    }

    private function gen_access_token($data = array()){

        $key = getenv('ACCESS_TOKEN_SECRET');
        $now = strtotime(date('Y-m-d H:i:s'));

        $period = "30";
        $min2sec = $period;
        $exp = strtotime("+ ".$min2sec."seconds");

        $payload = array(
            "iat"       => $now,
            "nbf"       => $now,
            "exp"       => $exp,
            "username"  => isset($data['username'])?$data['username']:'-',
        );


 
        $token = JWT::encode($payload, $key);


        $result = array(
            'access_token'   =>   $token,  
            'payload'        =>   $payload  
        );

        return $result;
    }

    private function gen_refresh_token($data = array()){

        $key = getenv('REFRESH_TOKEN_SECRET');
        $now = strtotime(date('Y-m-d H:i:s'));

        $period = REFRESH_TOKEN_DURATION;
        $min2sec = $period * 60;
        $exp = strtotime("+ ".$min2sec."seconds");

        $payload = array(
            "iat"       => $now,
            "nbf"       => $now,
            "exp"       => $exp,
            "username"  => isset($data['username'])?$data['username']:'-',
        );


 
        $token = JWT::encode($payload, $key);

        $result = array(
            'token'         => $token,
            'duration'      => $min2sec,
        );

        return $result;
    }

    public function verify_auth($access_token = ""){

        enable_cors_header();

        $request = service('request');

        $post = $request->getVar();

        if(isset($post->access_token)){
            $access_token = $post->access_token;
        }


        if(empty($access_token)){
            $refresh_token = get_cookie(REFRESH_TOKEN_NAME);
            array_debug($refresh_token);exit;
        }
    }

    public function test(){


        echo "<form method='POST' action='".base_url()."/authentication'><input type='text' name='username' value = 'test'><input type='submit'></form>";
    }
}
