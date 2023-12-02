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
        Schema::create('working_hours', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_staff')                       // + id сотрудника Которому проставляются отметки
                ->constrained('staff')
                ->cascadeOnDelete();
            $table->foreignId('id_admin1')                       // + id администратора, который создал отметк о приходе
                ->nullable()
                ->constrained('staff')
                ->cascadeOnDelete();
            $table->foreignId('id_admin2')                       // + id администратора, который создал отметку об уходе
                ->nullable()
                ->constrained('staff')
                ->cascadeOnDelete();
            $table->dateTime('beginning');                      // + Начало смены
            $table->dateTime('end');                            // + Конец смены
            $table->dateTime('work_in')->nullable();                        // + Время фактичекого прихода на работу
            $table->dateTime('work_out')->nullable();                       // + Время фактического ухода с работы
            $table->string('note')->nullable();                 // + Заметка, причина опоздания или отсутствия
            $table->boolean('overtime_before')->nullable();     // - Отметка, что нужно учесть рабочие часы до начала смены
            $table->boolean('overtime_after')->nullable();      // - Отметка, что нужно учесть рабочие часы после окончания смены
            $table->boolean('violation')->nullable();           // + Отметка о нарушении режима (типа если опоздал или прогулял смену)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('working_hours');
    }
};
