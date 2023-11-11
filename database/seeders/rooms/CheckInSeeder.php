<?php

namespace Database\Seeders\rooms;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CheckInSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    private array $checkIn = [
        [
            'id_admin' => 2,
            'checkIn' => '2023-07-15',
            'checkOut' => '203-07-25',
            'id_booking' => 1,
        ],
        [
            'id_admin' => 3,
            'checkIn' => '2023-08-05',
            'checkOut' => '203-08-23',
            'id_booking' => 3,
        ],
        [
            'id_admin' => 4,
            'checkIn' => '2023-08-06',
            'checkOut' => '203-08-16',
            'id_booking' => 4,
        ],
        [
            'id_admin' => 2,
            'checkIn' => '2023-09-12',
            'checkOut' => '203-09-28',
            'id_booking' => 5,
        ],
        [
            'id_admin' => 2,
            'checkIn' => '2023-10-11',
            'checkOut' => '203-10-21',
            'id_booking' => 7,
        ],
        [
            'id_admin' => 4,
            'checkIn' => '2023-10-15',
            'checkOut' => '203-10-25',
            'id_booking' => 8,
        ],
        //-----------------------------------------------
        [
            'id_admin' => 3,
            'checkIn' => '2023-09-15',
            'checkOut' => '2024-01-03',
            'id_booking' => 9,
        ],
        [
            'id_admin' => 2,
            'checkIn' => '2023-09-26',
            'checkOut' => '2024-01-14',
            'id_booking' => 10,
        ],
        [
            'id_admin' => 4,
            'checkIn' => '2023-10-08',
            'checkOut' => '2024-01-20',
            'id_booking' => 12,
        ],
        [
            'id_admin' => 4,
            'checkIn' => '2023-10-12',
            'checkOut' => '2024-01-18',
            'id_booking' => 13,
        ],
    ];

    public function run(): void
    {
        DB::table('check_in')->insert($this->checkIn);
    }
}
