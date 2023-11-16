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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('id_room')
                  ->constrained('rooms')->cascadeOnDelete();
            $table->foreignId('id_staff')->nullable()
                  ->constrained('staff')->cascadeOnDelete();
            $table->date('created_date');
            $table->date('execution_date')->nullable();
            $table->string('comment')->nullable();
            $table->string('status')->default('не сделано');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
