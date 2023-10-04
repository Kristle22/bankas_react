<?php

namespace App\Db;

use App\Db\DataBase;

const DIR = __DIR__.'/../../';

class Json implements DataBase {

  private static $obj;
  private $data, $file;

  public static function get($file) {
    return self::$obj ?? self::$obj = new self($file); 
  }

  public function __construct($file) {
    $this->file = $file;
    if (!file_exists(DIR.'data/'.$file.'.json')) {
      file_put_contents(DIR.'data/'.$file.'.json', json_encode([]));
      file_put_contents(DIR.'data/'.$file.'_id.json', 0);
    }
    $this->data = json_decode(file_get_contents(DIR.'data/'.$file.'.json'), 1);
  }

  public function __destruct() {
    // if (null === $this->data) return;
    file_put_contents(DIR.'/data/'.$this->file.'.json', json_encode($this->data));
  }

  private function getId() {
    $id = (int)file_get_contents(DIR.'data/'.$this->file.'_id.json');
    $id++;
    file_put_contents(DIR.'data/'.$this->file.'_id.json', $id);
    return $id;
  }

  public function showAll() : array {
    return $this->data;
  }

  public function create(array $data) : void {
    $data['id'] = $this->getId();
    $data['deposit'] = 0;
    $this->data[] = $data;
  }

  public function update(int $id, array $data) : void {
    foreach($this->data as $key => $acc) {
      if ($acc['id'] == $id) {
        $data['id'] = $id;
        $this->data[$key] = $data;
        break;
      }
    }
   }

  public function show(int $userId) : array {
    foreach($this->data as $user) {
      if ($user['id'] == $userId) {
        return $user;
      }
    }
    M::add('alert', 'Vartotojas su ID '.$userId .'nera sukurtas!');
    return [];
 }

 public function delete(int $id) : void {
  foreach($this->data as $key => $item) {
    if ($item['id'] == $id) {
      unset($this->data[$key]);
      $this->data = array_values($this->data);
    }
  }
 }

}