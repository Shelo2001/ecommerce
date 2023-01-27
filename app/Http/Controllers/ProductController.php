<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getProducts(){
        $products = Product::paginate(12);
        return response($products);
    }

    public function getProduct($id){
        $product = Product::where('id', $id)->first();
        return response($product);
    }

}
