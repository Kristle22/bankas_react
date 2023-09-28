<?php
require './JsonDb.php';

// settings
define('INSTALL', '/bankas_react/server/');
define('DIR', __DIR__.'/');
define('URL', 'http://localhost/bankas_react/server/');
// //////////////////////////////////////

$uri = str_replace(INSTALL, '', $_SERVER['REQUEST_URI']);
$uri = explode('/', $uri);

$m = $_SERVER['REQUEST_METHOD'];
$db = new JsonDb('accounts');

// ROUTER
// if ('GET' == $m && 1 == count($uri) && 'animals' == $uri[0]) {
//   $out = $db->showAll();
// }
// if ('POST' == $m && 1 == count($uri) && 'animals' == $uri[0]) {
//   $rawData = file_get_contents("php://input");
//     $data = json_decode($rawData, 1);
//     $db->create($data);
//     $out = ['msg' => 'OK, donkey!'];
//   }
// if ('DELETE' == $m && 2 == count($uri) && 'animals' == $uri[0]) {
//     $db->delete($uri[1]);
//     $out = ['msg' => 'OK, donkey!'];
//   }
// if ('PUT' == $m && 2 == count($uri) && 'animals' == $uri[0]) {
//   $rawData = file_get_contents("php://input");
//   $data = json_decode($rawData, 1);
//   $db->update($uri[1], $data);
//   $out = ['msg' => 'OK, donkey!'];
//   }

// $out = json_encode($out);

// header('Content-Type: application/json');
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT');
// header("Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With");

// echo $out;
