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

    $oneBook = Book::loadBookById($_GET['id']);
    echo json_encode($oneBook);
}

if($_SERVER['REQUEST_METHOD'] == 'DELETE') {


    parse_str(file_get_contents("php://input"),$del_vars);
    $usun = Book::DeleteBookFromDb($del_vars['id']);
}

if($_SERVER['REQUEST_METHOD'] == 'PUT'){

    parse_str(file_get_contents("php://input"),$put_vars);
    $update = Book::UpdateBookToDb($put_vars['newId'], $put_vars['newTitle'], $put_vars['newAuthor'], $put_vars['newDescribe']);
}




?>