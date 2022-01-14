<?php
Header('Access-Control-Allow-Origin: localhost:4000');
Header('Access-Control-Allow-Headers: *');
Header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');

abstract class ProductsCommunicator
{
    protected $conn;
    private $mysqliResult;
    private $mysqliAssoc;

    private function initiateDBConnection()
    {
        $this->conn = mysqli_connect("localhost", "root", "", "teststore");
        if (mysqli_connect_errno()) {
            echo 'Failed to connect to MySQL ' . mysqli_connect_errno();
        }
        mysqli_set_charset($this->conn, "utf8");
    }

    abstract protected function generateQuery(): string;

    private function sendMysqliGetQuery()
    {
        if (mysqli_query($this->conn, $this->generateQuery())) {
            $this->mysqliResult = mysqli_query($this->conn, $this->generateQuery());
        }
    }

    private function toMysqliAssoc()
    {
        if ($this->mysqliResult) {
            $this->mysqliAssoc = mysqli_fetch_all($this->mysqliResult, MYSQLI_ASSOC);
        }
    }

    private function sendMysqliDeleteQuery()
    {
        if (
            strlen($this->generateQuery()) > 0 &&
            mysqli_query($this->conn, $this->generateQuery())
        ) {
            echo mysqli_affected_rows($this->conn);
        } else {
            echo 'ERROR: ' . mysqli_error($this->conn);
        }
    }

    private function sendMysqliAddQuery()
    {
        if (
            strlen($this->generateQuery()) > 0 &&
            mysqli_multi_query($this->conn, $this->generateQuery())
        ) {
            echo mysqli_affected_rows($this->conn);
        } else {
            echo 'ERROR: ' . mysqli_error($this->conn);
        }
    }

    private function closeConnection()
    {
        if ($this->mysqliResult) {
            mysqli_free_result($this->mysqliResult);
        };

        mysqli_close($this->conn);
    }

    protected function getProducts()
    {
        $this->initiateDBConnection();
        $this->sendMysqliGetQuery();
        $this->toMysqliAssoc();
        $this->closeConnection();

        return $this->mysqliAssoc;
    }

    protected function deleteProducts()
    {
        $this->initiateDBConnection();
        $this->sendMysqliDeleteQuery();
        mysqli_close($this->conn);

        return $this->mysqliResult;
    }

    protected function addProduct()
    {
        $this->initiateDBConnection();
        $this->sendMysqliAddQuery();
        mysqli_close($this->conn);

        return $this->mysqliResult;
    }
}
