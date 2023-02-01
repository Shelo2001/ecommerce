<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\ShippingAddressController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//User
Route::post('/register', [AuthenticationController::class, 'register']);
Route::post('/login', [AuthenticationController::class, 'login']);
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function(Request $request) {
        return auth()->user();
    });
    Route::get('/logout', [AuthenticationController::class, 'logout']);
    
    Route::post('/shippingaddress/save',[ShippingAddressController::class,'saveShippingAddress']);
    Route::get('/shippingaddress/{id}',[ShippingAddressController::class,'getShippingAddress']);
    
    Route::get('/order/{id}',[OrderController::class,'getOrderById']);
    Route::post('/order/save',[OrderController::class,'saveOrder']);

});

//Products 
Route::get('/products',[ProductController::class,'getProducts']);
Route::get('/products/{id}',[ProductController::class,'getProduct']);
Route::post('/order/update/{orderid}',[OrderController::class,'updateOrderPayOnDelivery']);
Route::post('/order/pay/{orderid}',[OrderController::class,'payOrder']);
Route::get('/order/myorders/{userid}',[OrderController::class,'myOrders']);

