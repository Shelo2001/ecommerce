<?php

namespace App\Models;

use App\Models\User;
use App\Models\ShippingAddress;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;
    protected $fillable=[
        "product_id",
        "title",
        "quantity",
        "price",
        "user_id",
        "shipping_address_id",
        "order_id",
        "is_delivered",
        "is_paid",
        "pay_on_delivery"
    ];

    public function User(){
        return $this->belongsTo(User::class);
    }

    public function ShippingAddress(){
        return $this->belongsTo(ShippingAddress::class);
    }
}

