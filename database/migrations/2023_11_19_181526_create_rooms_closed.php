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
        Schema::create('rooms_closed', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_rooms')->constrained('rooms')->cascadeOnDelete();
            $table->dateTime('closure_at');
            $table->dateTime('opening_at');
            $table->foreignId('employee')->constrained('staff')->cascadeOnDelete();
            $table->string('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms_closed');
    }
};
