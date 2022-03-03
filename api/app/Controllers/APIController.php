<?php

namespace App\Controllers;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;

class APIController extends BaseController
{

    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger)
    {
        // Do Not Edit This Line
        parent::initController($request, $response, $logger);

        // Preload any models, libraries, etc, here.

        // Add CORS header
        enable_cors_header();
    }

    protected function gen_access_token($data = array()){

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

    protected function gen_refresh_token($data = array()){

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


        $request = service('request');

        $post = $request->getVar();

        if(isset($post->access_token)){
            $access_token = $post->access_token;
        }


        if(empty($access_token)){
            $key = getenv('REFRESH_TOKEN_SECRET');
            $refresh_token = get_cookie(REFRESH_TOKEN_NAME);
            
            try{
                $payload = JWT::decode($refresh_token, new Key($key,"HS256"));

                $expire_date = null;
                if(isset($payload->exp)){
                    $expire_date = date("Y-m-d H:i:s",$payload->exp);
                    $now = date("Y-m-d H:i:s");
                    
                    if($now > $expire_date){
                        // echo "Expired";
                        return $this->response->setStatusCode(403);
                    }else{
                        // echo "Valid";

                        $data = array(
                            "username" => $payload->username,
                        );

                        $access_token = $this->gen_access_token($data);
                        $refresh_token = $this->gen_refresh_token($data);

                        // store a cookie value
                        set_cookie(REFRESH_TOKEN_NAME, $refresh_token['token'], $refresh_token['duration'],"","/","",false,true);

                        return $this->response->setJSON($access_token);
                    }

                }
                
            } catch (\Exception $e) { // Also tried JwtException
                echo $e;
                return $this->response->setStatusCode(403);
            }
            
            // $payload = JWT::decode($refresh_token, new Key($key,"HS256"));
            
        }
    }

    protected function need_login(){
        
        $request = service('request');
       
        $auth_header = $request->getHeader('Authorization');

        // Verify Authorization Header
        if(isset($auth_header) && !empty($auth_header->getValue())){
            $tokens = explode(" ",$auth_header->getValue());
            
            if(sizeof($tokens) < 2){
                return $this->response->setStatusCode(403);
            }
            
            $access_token = $tokens[1];
            $key = getenv('ACCESS_TOKEN_SECRET');
            $expired = false;

            try{
                $payload = JWT::decode($access_token, new Key($key,"HS256"));
                
                 return true;  
               
                
            }
            catch(ExpiredException $e){
                $expired = true;
               
            }
            catch (\Exception $e) { // Also tried JwtException
                // echo $e;
                return $this->response->setStatusCode(403);
            }
            
             // Handle access token expired -> check refresh token
             if($expired){
                
                //Refresh Token
                $key = getenv('REFRESH_TOKEN_SECRET');
                $refresh_token = get_cookie(REFRESH_TOKEN_NAME);

                $exception = false;
                $payload = null;
                
                try{
                    $payload = JWT::decode($refresh_token, new Key($key,"HS256")); 
                    
                }
                catch(ExpiredException $e){
                    $exception = true;
                }
                catch(\Exception $e){
                    $exception = true;
                }

                if($exception){
                    // Refresh Token Expired / Invalid Refresh Token
                    return $this->response->setStatusCode(403);
                }
                 
                $data = array(
                    "username" => $payload->username,
                );
    
                $access_token = $this->gen_access_token($data);
                $refresh_token = $this->gen_refresh_token($data);
    
                // store a cookie value
                set_cookie(REFRESH_TOKEN_NAME, $refresh_token['token'], $refresh_token['duration'],"","/","",false,true);
    
                // array_debug("hit 401");exit;
                $this->response->setStatusCode(401);
                return $this->response->setJSON($access_token);
             }
            
            
            // array_debug($access_token);exit;
        }else{
            return $this->response->setStatusCode(403);
        }

        
    }

    
}
