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
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('images');
            $table->string('number')->unique();
            $table->integer('price');
            $table->integer('additional_guest');
            $table->integer('max_guests');
            $table->foreignId('id_category')
                ->constrained('categories')->cascadeOnDelete();
            $table ->json('comfort');
            $table->json('sets');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
