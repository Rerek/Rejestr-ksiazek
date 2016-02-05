<?php

require_once(dirname(__FILE__) . "/config.php");
require_once (dirname(__FILE__) . "/book.php");




$conn = new mysqli($dbHostname, $dbUsername, $dbPassword, $dbBaseName);

if($conn->connect_errno){
    die ("Połączenie do bazy danych nie udane" . $conn->connect_error);
}

Book::SetConnection($conn);

?>