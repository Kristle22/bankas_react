<?php
namespace Bankas\Db\Controllers;

use Bankas\Db\App;

class AdminController {

  private $db = 'App\\Db\\Json';
  // private $db = 'App\\Db\\Maria';
  private $file ='accounts';
  
  // private static $nr;
  
  private function getData($file) {
    $this->file = $file;
    
    return $this->db::get($file);
  }
  
  public function __construct() {
  
  }

  // private static function getNr() {
  //   return self::$nr = 'LT'.rand(100000000000000000, 999999999999999999);
  // }

  public function indexJson() {
    $user = 'Kristina';
    return App::json(['user' => $user]);
  }

  public function listJson() {
    $data = $this->getData($this->file)->showAll();
    // usort($data, function($a, $b) {
    //   return $a['name'] <=> $b['surname'];
    // });
    return App::json($data);
  }

  public function formJson() {
    $rawData = file_get_contents("php://input");
    $data = json_decode($rawData, 1);
    
    if (strlen($data['PC']) < 11 || strlen($data['PC'] > 11)) {
      $err = 1;
      $msg = 'The text must contain 11 symbols';
    } else {
      $err = 0;
      $msg = 'Correct, your account was created!';
    }

    return App::json(['err' => $err, 'msg' => $msg]);
  }

  public function createAcc() {
    $rawData = file_get_contents("php://input");
    $data = json_decode($rawData, 1);

    if (strlen($data['name']) < 3 || strlen($data['surname'] < 3)) {
      $msg = 'The name and surname must contain at least 3 symbols';
    }
    if (strlen($data['PC']) < 11 || strlen($data['PC'] > 11)) {
      $msg = 'The text must contain 11 symbols';
    } else {
      $msg = 'Correct, your account was created!';
    }

    $this->getData($this->file)->create($data);
    $msg = 'New account was created successfully!';

    return App::json(['msg' => $msg]);
  }

  public function updateAcc($action, $id) {

    $rawData = file_get_contents("php://input");
    $data = json_decode($rawData, 1);
    $sum = $data['sum'];

    $account = $this->getData($this->file)->show($id);
    if (empty($sum)) {
      $msg = 'Enter the sum.';
      }
    if ('add' == $action) {
      $account['deposit'] += (float)$sum;
      $msg = 'Your money was successfully transfered';
    }
    if ('charge' == $action) {
      if ($sum > $account['deposit']) {
        $msg = 'Your account balance is insufficient';
      }
      $account['deposit'] -= (float)$sum;
      $msg = 'Your money was successfully transfered';
    }
    $this->getData($this->file)->update($id, $account);
    $msg = 'This account was updated successfully!';

    return App::json(['msg' => $msg]);
  } 

  public function deleteAcc($id) {
    $account = $this->getData($this->file)->show($id);
    if ($account['deposit'] > 0) {
      $msg = 'Your account cannot be deleted, because you have funds in it.';
    }
    $this->getData($this->file)->delete($id);
    $msg = 'An account was deleted successfully!';

    return App::json(['msg' => $msg]);
  }

}