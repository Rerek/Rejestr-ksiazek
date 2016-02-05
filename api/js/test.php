<?php
require_once("../src/connectPHP.php");






$allBooks = Book::loadAllBooks();
echo json_encode($allBooks);

?>