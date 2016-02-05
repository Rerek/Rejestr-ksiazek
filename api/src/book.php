<?php


class Book{



    static private $connection = null;
    static public function SetConnection(mysqli $newConnection){
        Book::$connection = $newConnection;
    }


    private $id;
    private $nazwa;
    private $autor;
    private $opis;


    public function __construct($newId, $newNazwa, $newAutor, $newOpis){
        $this->id = intval ($newId);
        $this->setNazwa($newNazwa);
        $this->setAutor($newAutor);
        $this->setOpis($newOpis);
    }
    public function setNazwa($newNazwa){
        $this->nazwa = $newNazwa;
    }
    public function setAutor($newAutor){
        $this->autor = $newAutor;
    }
    public function setOpis($newOpis){
        $this->opis = $newOpis;
    }
    public function getId(){
        return $this->id;
    }
    public function getNazwa(){
        return $this->nazwa;
    }
    public function getAutor(){
        return $this->autor;
    }
    public function getOpis(){
        return $this->opis;
    }

    static public function loadAllBooks(){
        $ret = [];
        $sql = "SELECT * FROM books";
        $result = self::$connection->query($sql);
        if($result !== false) {
            if($result->num_rows>0) {
                while($row = $result->fetch_assoc()){
                   // $book = new Book($row['id'], $row['nazwa'], $row['autor'], $row['opis']);
                    $ret[] = $row;
                }
            }
        }
        return $ret;
    }
    static public function Create($nazwa, $autor, $opis){
        $sql = "INSERT INTO books(nazwa, autor, opis)
                VALUES ('$nazwa', '$autor', '$opis')";
        $result = self::$connection->query($sql);
        if($result === true){
            $newBook = new Book(self::$connection->insert_id, $nazwa, $autor, $opis);
            return $newBook;
        }
        return false;
    }
}





?>