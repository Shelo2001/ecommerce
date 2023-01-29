<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ShippingAddress extends Model
{
    use HasFactory;

    protected $fillable = [
        "city",
        "street",
        "additional_info",
        "user_id",
    ];

    public function User(){
       return $this->belongsTo(User::class);
    }
}
