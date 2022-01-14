<?php
require('../config/communicator.php');

class Product extends ProductsCommunicator
{
    private function productAddQuery()
    {
        $productInputFields = json_decode(file_get_contents('php://input'));

        if (
            $this->conn &&
            $productInputFields &&
            property_exists($productInputFields, 'skuField') &&
            property_exists($productInputFields, 'nameField') &&
            property_exists($productInputFields, 'priceField')
        ) {
            $sku = mysqli_real_escape_string($this->conn, $productInputFields->skuField);
            $name = mysqli_real_escape_string($this->conn, $productInputFields->nameField);
            $price = mysqli_real_escape_string($this->conn, $productInputFields->priceField);

            return "INSERT INTO `products` (`sku`, `name`, `price`) VALUES ('$sku', '$name', '$price');";
        } else {
            return "";
        }
    }

    protected function generateQuery(): string
    {
        return $this->productAddQuery();
    }
}


interface ProductTypeI
{
    public function typeAddQuery(): string;
}

class Book extends Product implements ProductTypeI
{
    public function typeAddQuery(): string
    {
        $productInputFields = json_decode(file_get_contents('php://input'));

        if (
            $this->conn && $productInputFields && property_exists($productInputFields, 'skuField') && property_exists($productInputFields, 'weightField')
        ) {
            $sku = mysqli_real_escape_string($this->conn, $productInputFields->skuField);
            $weight = mysqli_real_escape_string($this->conn, $productInputFields->weightField);

            return "INSERT INTO `book_attributes` (`skuId`, `weight`) VALUES ('$sku', '$weight');";
        } else {
            return "";
        }
    }

    protected function generateQuery(): string
    {
        if (parent::generateQuery() && $this->typeAddQuery()) {
            return parent::generateQuery() . $this->typeAddQuery();
        } else {
            return "";
        }
    }

    public function request()
    {
        return $this->addProduct();
    }
}

class Dvd extends Product implements ProductTypeI
{
    public function typeAddQuery(): string
    {
        $productInputFields = json_decode(file_get_contents('php://input'));

        if (
            $this->conn && $productInputFields && property_exists($productInputFields, 'skuField') && property_exists($productInputFields, 'sizeField')
        ) {
            $sku = mysqli_real_escape_string($this->conn, $productInputFields->skuField);
            $size = mysqli_real_escape_string($this->conn, $productInputFields->sizeField);

            return "INSERT INTO `dvd_attributes` (`skuId`, `size`) VALUES ('$sku', '$size');";
        } else {
            return "";
        }
    }

    protected function generateQuery(): string
    {
        if (parent::generateQuery() && $this->typeAddQuery()) {
            return parent::generateQuery() . $this->typeAddQuery();
        } else {
            return "";
        }
    }


    public function request()
    {
        return $this->addProduct();
    }
}

class Furniture extends Product implements ProductTypeI
{
    public function typeAddQuery(): string
    {
        $productInputFields = json_decode(file_get_contents('php://input'));

        if (
            $this->conn && $productInputFields && property_exists($productInputFields, 'skuField') && property_exists($productInputFields, 'lengthField') &&
            property_exists($productInputFields, 'heightField') && property_exists($productInputFields, 'widthField')
        ) {
            $sku = mysqli_real_escape_string($this->conn, $productInputFields->skuField);
            $height = mysqli_real_escape_string($this->conn, $productInputFields->heightField);
            $width = mysqli_real_escape_string($this->conn, $productInputFields->widthField);
            $length = mysqli_real_escape_string($this->conn, $productInputFields->lengthField);

            return "INSERT INTO `furniture_attributes` (`skuId`, `height`, `width`, `length`) VALUES ('$sku', '$height', '$width', '$length');";
        } else {
            return "";
        }
    }

    protected function generateQuery(): string
    {
        if (parent::generateQuery() && $this->typeAddQuery()) {
            return parent::generateQuery() . $this->typeAddQuery();
        } else {
            return "";
        }
    }


    public function request()
    {
        return $this->addProduct();
    }
}

$productInputFields = json_decode(file_get_contents('php://input'));

if ($productInputFields && property_exists($productInputFields, 'productTypeField')) {
    $type = $productInputFields->productTypeField;
    $productClassName = ucfirst(str_replace('_attributes', '', $type));

    $product = new  $productClassName;
    $product->request();
}
