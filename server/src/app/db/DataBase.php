<?php
namespace App\Db;


interface DataBase
{
    function create(array $data) : void;


    function update(int
 $dataId, array $data) : void;


    function delete(int
 $dataId) : void;


    function show(int
 $dataId) : array;
    
    function showAll() : array;
}
