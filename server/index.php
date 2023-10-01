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
if ('GET' == $m && 1 == count($uri) && 'accounts' == $uri[0]) {
  $out = $db->showAll();
}
if ('POST' == $m && 1 == count($uri) && 'accounts' == $uri[0]) {
  $rawData = file_get_contents("php://input");
    $data = json_decode($rawData, 1);
    $db->create($data);
    $out = ['msg' => 'New account was created successfully!'];
  }
if ('DELETE' == $m && 2 == count($uri) && 'accounts' == $uri[0]) {
    $db->delete($uri[1]);
    $out = ['msg' => 'An account was deleted successfully!'];
  }
if ('PUT' == $m && 3 == count($uri) && 'accounts' == $uri[0] && in_array($uri[1], ['add', 'charge'])) {
  $rawData = file_get_contents("php://input");
  $data = json_decode($rawData, 1);
  $db->updateAcc($uri[1], $uri[2], $data['sum']);

  $out = ['msg' => 'This account was updated successfully!'];
  }

$out = json_encode($out);

header('Content-Type: application/json');

echo $out;
