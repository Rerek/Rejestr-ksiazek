<?php
require_once ("./src/connectPHP.php");






$allBooks = Book::loadAllBooks();
var_dump($allBooks);

echo json_encode($allBooks);

?>