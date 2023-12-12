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
            'checkIn' => '2023-07-15 14:00:00',
            'checkOut' => '2023-07-25 12:00:00',
            'actualCheckOut' => '2023-07-25 12:00:00',
            'id_booking' => 1,
            'quantity_adults' => 1,
            'quantity_children' => 0,
        ],

        [
            'id_admin' => 3,
            'checkIn' => '2023-08-05 14:00:00',
            'checkOut' => '2023-08-23 12:00:00',
            'actualCheckOut' => '2023-08-23 12:00:00',
            'id_booking' => 3,
            'quantity_adults' => 2,
            'quantity_children' => 1,
        ],
        [
            'id_admin' => 4,
            'checkIn' => '2023-08-06 14:00:00',
            'checkOut' => '2023-08-16 12:00:00',
            'actualCheckOut' => '2023-08-16 12:00:00',
            'id_booking' => 4,
            'quantity_adults' => 2,
            'quantity_children' => 0,
        ],
        [
            'id_admin' => 2,
            'checkIn' => '2023-09-12 14:00:00',
            'checkOut' => '2023-09-28 12:00:00',
            'actualCheckOut' => '2023-09-28 12:00:00',
            'id_booking' => 5,
            'quantity_adults' => 3,
            'quantity_children' => 1,
        ],

        [
            'id_admin' => 2,
            'checkIn' => '2023-10-11 14:00:00',
            'checkOut' => '2023-10-21 12:00:00',
            'actualCheckOut' => '2023-10-21 12:00:00',
            'id_booking' => 7,
            'quantity_adults' => 1,
            'quantity_children' => 1,
        ],
        [
            'id_admin' => 4,
            'checkIn' => '2023-10-15 14:00:00',
            'checkOut' => '2023-11-12 12:00:00',
            'actualCheckOut' => '',
            'id_booking' => 8,
            'quantity_adults' => 2,
            'quantity_children' => 2,
        ],
        //-----------------------------------------------
        [
            'id_admin' => 3,
            'checkIn' => '2023-09-15 14:00:00',
            'checkOut' => '2024-01-03 12:00:00',
            'actualCheckOut' => '',
            'id_booking' => 9,
            'quantity_adults' => 2,
            'quantity_children' => 0,
        ],
        [
            'id_admin' => 2,
            'checkIn' => '2023-09-26 14:00:00',
            'checkOut' => '2024-01-14 12:00:00',
            'actualCheckOut' => '',
            'id_booking' => 10,
            'quantity_adults' => 2,
            'quantity_children' => 1,
        ],

        [
            'id_admin' => 4,
            'checkIn' => '2023-10-08 14:00:00',
            'checkOut' => '2024-01-20 12:00:00',
            'actualCheckOut' => '',
            'id_booking' => 12,
            'quantity_adults' => 3,
            'quantity_children' => 0,
        ],
        [
            'id_admin' => 4,
            'checkIn' => '2023-10-12 14:00:00',
            'checkOut' => '2024-01-18 12:00:00',
            'actualCheckOut' => '',
            'id_booking' => 13,
            'quantity_adults' => 1,
            'quantity_children' => 2,
        ],
    ];

    public function run(): void
    {
        DB::table('check_in')->insert($this->checkIn);
    }
}
