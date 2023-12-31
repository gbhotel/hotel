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
        Schema::create('booking', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_guest')
                ->constrained('guests')->cascadeOnDelete();
            $table->foreignId('id_room')
                ->constrained('rooms')->cascadeOnDelete();
            $table->date('check_in');
            $table->date('check_out');
            $table->foreignId('id_admin')
                ->constrained('staff');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking');
    }
};
