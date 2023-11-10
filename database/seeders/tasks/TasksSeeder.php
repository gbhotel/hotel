<?php

namespace Database\Seeders\tasks;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TasksSeeder extends Seeder
{
    private array $tasks = [
        'уборка комнаты после выезда',
        'уборка комнаты во время проживания',
        'уборка коридора',
        'уборка санузла',
        ];

    private array $statuses = [
        'сделано',
        'исполняется',
        'не сделано',
    ];

    public function run(): void
    {
        DB::table('tasks')->insert($this->getTasks());
    }

    public function getTasks() {
        $tasks = [];

        for($i = 0; $i < 10; $i++){
            $tasks [] = [
                'name'=> $this->tasks[fake()->numberBetween(0, 3)],
                'id_staff'=> fake()->numberBetween(1, 10),
                'created_date'=> fake()->date(),
                'status'=> $this->statuses[fake()->numberBetween(0, 2)]
            ];
        }
        return $tasks;
    }
}
