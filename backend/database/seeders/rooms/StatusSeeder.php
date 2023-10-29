<?php

namespace Database\Seeders\rooms;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusSeeder extends Seeder
{
    public function run() {
        DB::table('statuses')->insert($this->getStatuses());
    }

    public function getStatuses():array {
        return [
            1 => [
                'id' => 1,
                'status' => 'free',
            ],
            2 => [
                'id' => 2,
                'status' => 'occupied',
            ],
            3 => [
                'id' => 3,
                'status' => 'cleaning',
            ],
            4=> [
                'id' => 4,
                'status' => 'prohibited',
            ]

        ];
    }
}
