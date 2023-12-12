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
            $table->foreignId('id_guest_request')->nullable()->constrained('guest_requests')->cascadeOnDelete();
            $table->date('created_date');
            $table->dateTime('execution_date')->nullable();
            $table->integer('execution_time')->nullable();
            $table->string('comment')->nullable();
            $table->string('status')->default('не сделано');
            $table->dateTime('updated_at')->nullable();
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
