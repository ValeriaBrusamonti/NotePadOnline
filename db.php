<?php
$host = 'personalnotes-3655.jxf.gcp-europe-west1.cockroachlabs.cloud';
$port = 26257; 
$dbname = 'defaultdb';
$user = 'annalisabosi';
$password = 'E5HTFnbAe-yrqvMPj9ZC1w';

function db_connect()
{ 
    global $host, $port, $dbname, $user, $password; 
    $dsn = "pgsql:host=$host;port=$port;dbname=$dbname;sslmode=require;options='--cluster=personalnotes-3655'";

    
    $pdo = new PDO($dsn, $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    return $pdo;
}

function db_select($sql, $params)
{
    $conn = db_connect();
    $stmt = $conn->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();
    $conn = null;

    return $rows;
}
function db_exec($sql, $params)
{
    print_r($sql);
    print_r($params);
    $conn = db_connect();
    $stmt = $conn->prepare($sql);
    $res = $stmt->execute($params);
    return $res;

    ini_set('display_errors', 1);
error_reporting(E_ALL);
}

function db_select_row($sql, $params)
{
    $conn = db_connect();
    $stmt = $conn->prepare($sql);
    $stmt->execute($params);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    return $row;
}

function notes_select()
{
    $sql="select titolo, contenuto from nota";
    return db_select($sql, null);
}
function utenti_select()
{
    $sql="select name, surname, email from utente";
    return db_select($sql, null);
}

function utenti_verify_select($email)
{
    $sql="select password from utente where email=?";
    return db_select_row($sql, [$email]);
}

function agent_add($email, $password, $name, $surname, $birth_date, $city, $state)
{

    $sql="Insert into utente(email, password, name, surname, birth_date, city, state) values( :email, :password, :name, :surname, :birth_date, :city, :state);";
    return db_exec($sql, [':email' => $email,':password' => $password, ':name' =>  $name,  ':surname' => $surname, ':birth_date' =>  $birth_date,':city' => $city, ':state' => $state]);
}
?>