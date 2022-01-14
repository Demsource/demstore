<?php
require('../config/communicator.php');

class ProductsRemover extends ProductsCommunicator
{
    protected function generateQuery(): string
    {
        if (isset($_POST["deleteList"])) {
            $list = $_POST["deleteList"];
            return "DELETE FROM products WHERE sku IN($list);";
        } else {
            return "";
        }
    }

    public function request()
    {
        return $this->deleteProducts();
    }
}

$productsRemover = new ProductsRemover();
$productsRemover->request();
