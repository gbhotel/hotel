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
        Schema::create('guest_requests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('id_room')->constrained('rooms')->cascadeOnDelete();
            $table->foreignId('id_guest')->constrained('guests')->cascadeOnDelete();
            $table->string('comment')->default('здесь пока ничего не оставили')->nullable();
            $table->date('created_date');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guest_requests');
    }
};
