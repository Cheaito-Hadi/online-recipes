<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lists', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('shopping_id');
            $table->unsignedBigInteger('recipe_id');
            $table->foreign('recipe_id')->references('id')->on('recipes')->onDelete('cascade');
            $table->foreign('shopping_id')->references('id')->on('shopping_lists')->onDelete('cascade');   
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lists');
    }
};
