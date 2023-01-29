<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\ShippingAddress;

class ShippingAddressController extends Controller
{
    public function saveShippingAddress(Request $request){
        $attr = $request->validate([
            'city' => 'required|string',
            'street' => 'required|string',
            'additional_info' => 'required|string',
            'user_id' => 'required',
        ]);

        if(ShippingAddress::where('user_id',$attr['user_id'])->exists()){
            $shippingAddress = ShippingAddress::where('user_id',$attr['user_id'])->first();
            $shippingAddress->city =$attr['city'];
            $shippingAddress->street =$attr['street'];
            $shippingAddress->additional_info =$attr['additional_info'];

            $shippingAddress->save();
        } else {
            $shippingAddress = ShippingAddress::create([
                'city' => $attr['city'],
                'street' => $attr['street'],
                'additional_info' =>$attr['additional_info'],
                'user_id' => $attr['user_id']
            ]);
        }

        

        return response([
            "shippingAddress"=>$shippingAddress,
            
        ],201);
    }

    public function getShippingAddress($id){
        $shippingAddress = ShippingAddress::where("user_id",$id)->first();
        $user=$shippingAddress->User;
        return response([
           "address"=> $shippingAddress,
        ]);
    }
}
