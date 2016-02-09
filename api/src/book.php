<?php


class Book
{


    static private $connection = null;

    static public function SetConnection(mysqli $newConnection)
    {
        Book::$connection = $newConnection;
    }

    static public function Create($nazwa, $autor, $opis)
    {
        if (strlen($autor) < 1) {
            $autor = '(brak)';
        }
        if (strlen($opis) < 1) {
            $opis = '(brak)';
        }
        $sql = "INSERT INTO books(nazwa, autor, opis)
                VALUES ('$nazwa', '$autor', '$opis')";
        $result = self::$connection->query($sql);
        if ($result === true) {
            $newBook = new Book(self::$connection->insert_id, $nazwa, $autor, $opis);
            return $newBook;
        }
        return false;
    }

    static public function loadAllBooks()
    {
        $ret = [];
        $sql = "SELECT id, nazwa FROM books";
        $result = self::$connection->query($sql);
        if ($result !== false) {
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    // $book = new Book($row['id'], $row['nazwa'], $row['autor'], $row['opis']);
                    $ret[] = $row;
                }
            }
        }
        return $ret;
    }

    static public function loadBookById($id)
    {
        $sql = "SELECT * FROM books where id = $id";
        $result = self::$connection->query($sql);
        if ($result !== false) {
            if ($result->num_rows == 1) {
                while ($row = $result->fetch_assoc()) {
                    $book = $row;
                }
            }
        }
        return $book;
    }

    static public function DeleteBookFromDb($id)
    {
        $sql = "DELETE FROM books WHERE id = $id";
        $result = self::$connection->query($sql);
        if ($result == false) {
            return false;
        }
    }

    static public function UpdateBookToDb($id, $name, $author, $describe)
    {
        if (strlen($author) < 1) {
            $author = '(brak)';
        }
        if (strlen($describe) < 1) {
            $describe = '(brak)';
        }
        $sql = "UPDATE books SET nazwa='$name', autor='$author', opis='$describe' WHERE id = $id";
        $result = self::$connection->query($sql);
        if ($result == false) {
            return false;
        }
    }

    private $id;
    private $nazwa;
    private $autor;
    private $opis;


    public function __construct($newId, $newNazwa, $newAutor, $newOpis)
    {
        $this->id = intval($newId);
        $this->setNazwa($newNazwa);
        $this->setAutor($newAutor);
        $this->setOpis($newOpis);
    }

    public function setNazwa($newNazwa)
    {
        $this->nazwa = $newNazwa;
    }

    public function setAutor($newAutor)
    {
        $this->autor = $newAutor;
    }

    public function setOpis($newOpis)
    {
        $this->opis = $newOpis;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getNazwa()
    {
        return $this->nazwa;
    }

    public function getAutor()
    {
        return $this->autor;
    }

    public function getOpis()
    {
        return $this->opis;
    }
}


?>