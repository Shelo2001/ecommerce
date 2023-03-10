<?php

namespace App\Http\Controllers;

use PDF;
use App\Models\Order;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Storage;

class OrderController extends Controller
{
    public function saveOrder(Request $request){
        $products = $request['products'];
        $shippingAddress = $request['shipping_address_id'];
        $userId = $request['user_id'];
        $randomString = Str::random(30);
        
        foreach($products as $product){
           $order = new Order([
                "order_id"=>$randomString,
                "product_id"=>$product['id'],
                "title"=>$product['title'],
                "quantity"=>$product['quantity'],
                "price"=>$product['price'],
                "shipping_address_id"=>$shippingAddress,
                "user_id"=>$userId,
            ]);

            $order->save();
            $order->User;
            $order->ShippingAddress;
    }


        return response([$order]);
    }

    public function getOrderById($id){
        $order = Order::where("order_id", $id)->get();

        return response(["order"=>$order]);
    }

    public function updateOrderPayOnDelivery($orderid){
        $orders = Order::where("order_id", $orderid)->get();

        foreach($orders as $order){
            $order->update(['pay_on_delivery' => true]);
            $order->save();
        }
        
        return response([$order]);
    }

    public function payOrder(Request $request ,$orderid){
        $orders = Order::where("order_id", $orderid)->get();

        foreach($orders as $order){
            $order->update(['is_paid' => true]);
            $order->update(['payment_id' => $request['payment_id']]);
            $order->update(['payment_status' => $request['payment_status']]);
            $order->save();
        }
        

        return response([$order]);
    }

    public function myOrders($userid){
        $orders = Order::where("user_id", $userid)->groupBy('order_id')->orderBy('created_at')->get();

        return response([$orders]);
    }

    public function deleteMyOrders($orderid){
        $orders = Order::where("order_id", $orderid)->delete();

        return response(['successfully deleted']);
    }

    public function generateInvoice($orderid){
        $orders = Order::where("order_id", $orderid)->get();
        
        
        $orderItems = $orders->map(function ($order) {
            return [
                'id' => $order->id,
                'title' => $order->title,
                'quantity' => $order->quantity,
                'price' => $order->price*$order->quantity,
                'created_at'=>$order->created_at,
            ];
        })->toArray();

        $pdf = PDF::loadView('invoice', compact('orderItems'));
       

        return $pdf->download('invoice.pdf');
    }

}
