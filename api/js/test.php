<?php
require_once("../src/connectPHP.php");




if($_SERVER['REQUEST_METHOD'] == 'GET' && (!isset($_GET['id']))) {
    $allBooks = Book::loadAllBooks();
    echo json_encode($allBooks);
}

if($_SERVER['REQUEST_METHOD'] == 'POST') {

    $newBook = Book::Create($_POST['tytul'], $_POST['autor'], $_POST['opis']);
    echo json_encode("Dodano poprawnie książkę");
}

if(($_SERVER['REQUEST_METHOD'] == 'GET') && (isset($_GET['id']))) {
    $jednaKsiazka = Book::loadBookById($_GET['id']);
    echo json_encode($jednaKsiazka);
   // echo json_encode("udało się!");
}



?>