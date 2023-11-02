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
                'name' => 'free',
            ],
            2 => [
                'id' => 2,
                'name' => 'booked',
            ],
            3 => [
                'id' => 3,
                'name' => 'occupied',
            ],
            4=> [
                'id' => 4,
                'name' => 'cleaning',
            ],
            5=> [
                'id' => 5,
                'name' => 'prohibited',
            ]

        ];
    }
}
