<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string("order_id");
            $table->string("product_id");
            $table->string("title");
            $table->integer('quantity');
            $table->integer('price');
            $table->integer('user_id');
            $table->integer('shipping_address_id');
            $table->boolean("is_delivered")->default(false);
            $table->boolean("is_paid")->default(false);
            $table->boolean("pay_on_delivery")->default(false);
            $table->string("payment_id")->default('');
            $table->string("payment_status")->default('');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
