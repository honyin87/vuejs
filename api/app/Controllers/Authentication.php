<?php

namespace App\Controllers;


class Authentication extends APIController
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
        set_cookie(REFRESH_TOKEN_NAME, $refresh_token['token'], $refresh_token['duration'],"","/","",false,true);


        // get cookie value
        // array_debug(get_cookie("username"));

        // remove cookie value
        // delete_cookie("username");

        // 403 Forbidden
        // $this->response->setStatusCode(403);
        return $this->response->setJSON($access_token);
    }

    

   

    public function test(){


        echo "<form method='POST' action='".base_url()."/authentication'><input type='text' name='username' value = 'test'><input type='submit'></form>";
    }
}
