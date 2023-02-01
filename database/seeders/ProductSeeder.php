<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::create([
            "title"=> "PADDED BOMBER JACKET",
            "price"=> 109.95,
            "description"=> "Jacket with a padded interior and made of a technical fabric. Lapel collar and long sleeves. Hip welt pockets. Ribbed trims. Front zip fastening.",
            "category"=> "men's clothing",
            "image"=> "https://static.zara.net/photos///2023/V/0/2/p/3918/314/800/2/w/850/3918314800_1_1_1.jpg?ts=1674734720722",
            "quantity"=>20             
        ]);
        Product::create([
            "title"=> "QUILTED BOMBER JACKET",
            "price"=> 22.3,
            "description"=> "Jacket with padded interior. High neck and long sleeves. Welt pockets at the hip and inside pocket detail. Ribbed trims. Zip-up front.",
            "category"=> "men's clothing",
            "image"=> "https://static.zara.net/photos///2023/V/0/2/p/4302/302/800/2/w/850/4302302800_1_1_1.jpg?ts=1673612959897",
            "quantity"=>20             
        ]);
        Product::create([
            "title"=> "T-SHIRT WITH CONTRAST SLEEVES",
            "price"=> 55.99,
            "description"=> "Loose-fitting T-shirt featuring a round neck, contrast double sleeves, buttoned cuffs and a contrast print on the front.",
            "category"=> "men's clothing",
            "image"=> "https://static.zara.net/photos///2023/V/0/2/p/2888/440/800/2/w/850/2888440800_1_1_1.jpg?ts=1674747142915",
            "quantity"=>20             
        ]);
        Product::create([
            "title"=> "FAUX SUEDE BOMBER JACKET",
            "price"=> 15.99,
            "description"=> "Long sleeve jacket with a high collar. Featuring front welt pockets, ribbed trims and a zip-up front.",
            "category"=> "men's clothing",
            "image"=> "https://static.zara.net/photos///2023/V/0/2/p/6318/488/806/2/w/850/6318488806_1_1_1.jpg?ts=1669370523261",
            "quantity"=>20             
        ]);
        Product::create([
            "title"=> "LONG SLEEVE T-SHIRT",
            "price"=> 695,
            "description"=> "Long sleeve T-shirt with a round neckline.",
            "category"=> "women's clothing",
            "image"=> "https://static.zara.net/photos///2023/V/0/1/p/4174/316/803/2/w/850/4174316803_1_1_1.jpg?ts=1674747139096",
            "quantity"=>20             
        ]);
        Product::create([
            "title"=> "RIBBED T-SHIRT WITH RUFFLES",
            "price"=> 56.99,
            "description"=> "Round neck T-shirt with short sleeves. Ruffle detail in matching fabric",
            "category"=> "women's clothing",
            "image"=> "https://static.zara.net/photos///2023/V/0/1/p/2298/011/104/2/w/850/2298011104_1_1_1.jpg?ts=1674822515650",
            "quantity"=>0             
            
        ]);
        Product::create([
            "title"=> "WOOL BLEND T-SHIRT",
            "price"=> 29.95,
            "description"=> "Top made of felt texture fabric. High neck and long sleeves",
            "category"=> "women's clothing",
            "image"=> "https://static.zara.net/photos///2023/V/0/1/p/5644/007/802/2/w/850/5644007802_1_1_1.jpg?ts=1673978393523",
            "quantity"=>0             
        ]);
        Product::create([
            "title"=> "Z1975 STRAIGHT FIT CARGO JEANS",
            "price"=> 39.99,
            "description"=> "High-waist jeans with front pockets. Side and back patch pockets. Adjustable drawstring hems. Front zip fly and top button fastening.",
            "category"=> "women's clothing",
            "image"=> "https://static.zara.net/photos///2023/V/0/1/p/6147/027/800/2/w/850/6147027800_1_1_1.jpg?ts=1674745478510",   
            "quantity"=>200             
        ]);
        Product::create([
            "title"=> "RIPPED MOM TRF JEANS",
            "price"=> 9.85,
            "description"=> "High-rise rigid jeans with five pockets. Ripped details. Front zip fly and metal button fastening.",
            "category"=> "women's clothing",
            "image"=> "https://static.zara.net/photos///2023/V/0/1/p/4365/230/400/2/w/850/4365230400_1_1_1.jpg?ts=1674820626122",
            "quantity"=>100             
        ]);
    }
}
