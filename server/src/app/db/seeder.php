<?php
namespace App\Db;

require __DIR__.'/DataBase.php';
require __DIR__.'/Json.php';

$db = new Json('accounts');

$clients = [
['Kristina ', 'Leonaviciute', '48303221110'], ['Jonas', 'Kelmickis', '38303220111'], ['Mantas', 'Stanauskas', '38803031234'], ['Jolanta', 'Linkyte', '39007171147'], ['Petras', 'Stanauskas', '36406028344']
];

foreach (range(0, 4) as  $k => $_) {
  $nr = 'LT'.rand(100000000000000000, 999999999999999999);
  $newAcc = ['Nr' => $nr, 'name' => $clients[$k][0], 'surname' => $clients[$k][1], 'PC' => $clients[$k][2], 'deposit' => rand(1000, 100000) / 100];

  $db->create($newAcc);
};


  // $users = [
  //   ['id' => 1, 'name' => 'Petras', 'email' => 'petras@petras.com', 'pass' => md5('123')],
  //   ['id' => 2, 'name' => 'Ona', 'email' => 'ona@ona.com', 'pass' => md5('321')],
  //   ['id' => 3, 'name' => 'Jonas', 'email' => 'jonas@jonas.com', 'pass' => md5('456')],  ['id' => 4, 'name' => 'Kristina', 'email' => 'crislayn@yahoo.com', 'pass' => md5('322')]
  // ];