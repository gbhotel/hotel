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
        'прачечная',
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
            'id_guest_request' => null,
            'created_date'=> date('2023-11-08'),
            'execution_date'=> date('2023-11-08'),
            'execution_time' => 3600,
            'comment'=> '',
            'status'=> 'сделано',
            'updated_at' => date('2023-11-08'),
        ];
        $tasks [] = [
            'name'=> 'уборка номера',
            'id_room' => 10,
            'id_staff'=> fake()->numberBetween(5, 7),
            'id_guest_request' => null,
            'created_date'=> date('2023-11-05'),
            'execution_date'=> date('2023-11-05'),
            'execution_time' => 3600,
            'comment'=> '',
            'status'=> 'сделано',
            'updated_at' => date('2023-11-05'),
        ];

        $tasks [] = [
            'name'=> 'уборка номера',
            'id_room' => 2,
            'id_staff'=> fake()->numberBetween(5, 7),
            'id_guest_request' => null,
            'created_date'=>  date('2023-11-11'),
            'execution_date'=> date('2023-11-11'),
            'execution_time' => 3600,
            'comment'=> '',
            'status'=> 'сделано',
            'updated_at' => date('2023-11-11'),
        ];

        $tasks [] = [
            'name'=> 'уборка номера',
            'id_room' => 3,
            'id_staff'=> fake()->numberBetween(5, 7),
            'id_guest_request' => null,
            'created_date'=> date('2023-11-04'),
            'execution_date'=> date('2023-11-04'),
            'execution_time' => 3600,
            'comment'=> '',
            'status'=> 'сделано',
            'updated_at' => date('2023-11-04'),
        ];

        $tasks [] = [
            'name'=> 'доставка еды в номер',
            'id_room' => 3,
            'id_staff'=> fake()->numberBetween(5, 7),
            'id_guest_request' => null,
            'created_date'=> date('2023-11-04'),
            'execution_date'=> date('2023-11-04'),
            'execution_time' => 3600,
            'comment'=> '',
            'status'=> 'сделано',
            'updated_at' => date('2023-11-04'),
        ];

        $tasks [] = [
            'name'=> 'смена белья',
            'id_room' => 5,
            'id_staff'=> fake()->numberBetween(5, 7),
            'id_guest_request' => null,
            'created_date'=> date('2023-09-04'),
            'execution_date'=> date('2023-09-04'),
            'execution_time' => 3600,
            'comment'=> '',
            'status'=> 'сделано',
            'updated_at' => date('2023-09-04'),
        ];

        $tasks [] = [
            'name'=> 'услуги прачечной',
            'id_room' => 3,
            'id_staff'=> fake()->numberBetween(5, 7),
            'id_guest_request' => null,
            'created_date'=> date('2023-07-04'),
            'execution_date'=> date('2023-07-04'),
            'execution_time' => 3600,
            'comment'=> 'можете забрать из номера в 12:00',
            'status'=> 'сделано',
            'updated_at' => date('2023-07-04'),
        ];

        $tasks [] = [
            'name'=> 'ремонт',
            'id_room' => 8,
            'id_staff'=> 6,
            'id_guest_request' => null,
            'created_date'=> date('2023-06-04'),
            'execution_date'=> date('2023-06-04'),
            'execution_time' => 3600,
            'comment'=> 'не работает душ',
            'status'=> 'сделано',
            'updated_at' => date('2023-06-04'),
        ];

        $tasks [] = [
            'name'=> 'уборка номера',
            'id_room' => 5,
            'id_staff'=> 6,
            'id_guest_request' => null,
            'created_date'=> date('2023-11-18'),
            'execution_date'=> null,
            'execution_time' => 3600,
            'comment'=> 'подойдите после 15:00',
            'status'=> 'не сделано',
            'updated_at' => null,
        ];

        $tasks [] = [
            'name'=> 'смена белья',
            'id_room' => 3,
            'id_staff'=> 6,
            'id_guest_request' => null,
            'created_date'=> date('2023-11-18'),
            'execution_date'=> null,
            'execution_time' => 3600,
            'comment'=> 'подойдите после 11:00',
            'status'=> 'не сделано',
            'updated_at' => null,
        ];
        $tasks [] = [
            'name'=> 'смена белья',
            'id_room' => 2,
            'id_staff'=> 6,
            'id_guest_request' => null,
            'created_date'=> date('2023-11-18'),
            'execution_date'=> null,
            'execution_time' => 3600,
            'comment'=> 'можно дополнительную наволочку',
            'status'=> 'не сделано',
            'updated_at' => null,
        ];

        $tasks [] = [
            'name'=> 'прачечная',
            'id_room' => 9,
            'id_staff'=> 6,
            'id_guest_request' => null,
            'created_date'=> date('2023-11-18'),
            'execution_date'=> null,
            'execution_time' => 3600,
            'comment'=> null,
            'status'=> 'не сделано',
            'updated_at' => null,
        ];

        return $tasks;
    }
}
