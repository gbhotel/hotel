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
        Schema::create('check_in', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_admin')
                ->constrained('staff')
                ->cascadeOnDelete();
            $table->foreignId('id_booking')
                ->constrained('booking')
                ->cascadeOnDelete();
            $table->timestamp('checkIn');
            $table->dateTime('checkOut');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('check_in');
    }
};
