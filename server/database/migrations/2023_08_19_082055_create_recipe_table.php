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
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('cuisine_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');   
            $table->foreign('cuisine_id')->references('id')->on('cuisines')->onDelete('cascade');   
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipe');
    }
};
