<?php

namespace Database\Seeders\tasks;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TasksSeeder extends Seeder
{
    private array $tasks = [
        'уборка номера',
        'доставка еды в номер',
        'услуги прачечной',
        'смена белья',
        'ремонт',
        'другое'
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

        $tasks [] = [
            'name'=> 'уборка номера',
            'id_room' => 9,
            'id_staff'=> fake()->numberBetween(5, 7),
            'created_date'=> date('2023-11-08'),
            'execution_date'=> date('2023-11-08'),
            'comment'=> '',
            'status'=> 'сделано'
        ];
        $tasks [] = [
            'name'=> 'уборка номера',
            'id_room' => 10,
            'id_staff'=> fake()->numberBetween(5, 7),
            'created_date'=> date('2023-11-05'),
            'execution_date'=> date('2023-11-05'),
            'comment'=> '',
            'status'=> 'сделано'
        ];

        $tasks [] = [
            'name'=> 'уборка номера',
            'id_room' => 2,
            'id_staff'=> fake()->numberBetween(5, 7),
            'created_date'=>  date('2023-11-11'),
            'execution_date'=> date('2023-11-11'),
            'comment'=> '',
            'status'=> 'сделано'
        ];

        $tasks [] = [
            'name'=> 'уборка номера ',
            'id_room' => 3,
            'id_staff'=> fake()->numberBetween(5, 7),
            'created_date'=> date('2023-11-04'),
            'execution_date'=> date('2023-11-04'),
            'comment'=> '',
            'status'=> 'сделано'
        ];

        $tasks [] = [
            'name'=> 'услуги прачечной',
            'id_room' => 3,
            'id_staff'=> null,
            'created_date'=> date('2023-11-11'),
            'execution_date'=> null,
            'comment'=> '',
            'status'=> ' не сделано'
        ];

        $tasks [] = [
            'name'=> 'ремонт',
            'id_room' => 9,
            'id_staff'=> null,
            'created_date'=> date('2023-11-11'),
            'execution_date'=> null,
            'comment'=> 'сломался кран',
            'status'=> ' не сделано'
        ];

        return $tasks;
    }
}
