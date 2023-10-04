<?php
namespace Bankas\Db;

use Bankas\Db\Controllers\AdminController;

class App {
  
  public static function start() {
    
    define('DIR', __DIR__.'/../');
    define('INSTALL', '/bankas_react/server/public/');
    define('URL', 'http://localhost/bankas_react/server/public/');

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT');
    header("Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With");

    $uri = str_replace(INSTALL, '', $_SERVER['REQUEST_URI']);
    $uri = explode('/', $uri);

    self::route($uri);
  }

  public static function json($data = []) {
    header('Content-Type: application/json; charset=utf-8'); 
    
    echo json_encode($data);
   }

  public static function route(array $uri) {

    $m = $_SERVER['REQUEST_METHOD'];

    if ('GET' == $m && 2 == count($uri) && 'accounts' == $uri[0] && 'home' == $uri[1]) {
      return (new AdminController)->indexJson();
    }
    if ('GET' == $m && 1 == count($uri) && 'accounts' == $uri[0]) {
      return (new AdminController)->listJson();
    }
    if ('POST' == $m && 1 == count($uri) && 'accounts' == $uri[0]) {
      return (new AdminController)->createAcc();
      }
    if ('DELETE' == $m && 2 == count($uri) && 'accounts' == $uri[0]) {
      return (new AdminController)->deleteAcc($uri[1]);
      }
    if ('PUT' == $m && 3 == count($uri) && 'accounts' == $uri[0] && in_array($uri[1], ['add', 'charge'])) {
      return (new AdminController)->updateAcc($uri[1], $uri[2]);
      }
  }

}