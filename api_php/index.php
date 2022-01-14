<?php
require('./config/communicator.php');

class Products extends ProductsCommunicator
{
    protected function generateQuery(): string
    {
        return "SELECT * FROM `products` 
        LEFT JOIN book_attributes bka ON products.sku = bka.skuId
        LEFT JOIN dvd_attributes dvda ON products.sku = dvda.skuId
        LEFT JOIN furniture_attributes fna ON products.sku = fna.skuId  ORDER BY products.id;";
    }

    public function request()
    {
        return $this->getProducts();
    }
}

$products = new Products();
echo json_encode($products->request());
