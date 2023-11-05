<?php

namespace Database\Seeders\rooms;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    private array $bookings = [
        [
            'id_guest' => 1,
            'id_room' => 1,
            'id_admin' => 1,
            'check_in' => '2023-07-12',
            'check_out' => '2023-07-24',
        ],
        [
            'id_guest' => 2,
            'id_room' => 2,
            'id_admin' => 2,
            'check_in' => '2023-07-14',
            'check_out' => '2023-07-22',
        ],
        [
            'id_guest' => 3,
            'id_room' => 3,
            'id_admin' => 3,
            'check_in' => '2023-08-05',
            'check_out' => '2023-08-17',
        ],
        [
            'id_guest' => 4,
            'id_room' => 4,
            'id_admin' => 5,
            'check_in' => '2023-08-12',
            'check_out' => '2023-08-21',
        ],
        [
            'id_guest' => 5,
            'id_room' => 5,
            'id_admin' => 2,
            'check_in' => '2023-09-03',
            'check_out' => '2023-12-28',
        ],
        [
            'id_guest' => 6,
            'id_room' => 6,
            'id_admin' => 3,
            'check_in' => '2023-09-12',
            'check_out' => '2023-12-26',
        ],
        [
            'id_guest' => 7,
            'id_room' => 7,
            'id_admin' => 2,
            'check_in' => '2023-10-03',
            'check_out' => '2024-01-02',
        ],
        [
            'id_guest' => 8,
            'id_room' => 8,
            'id_admin' => 1,
            'check_in' => '2023-10-03',
            'check_out' => '2024-01-11',
        ],
        [
            'id_guest' => 9,
            'id_room' => 9,
            'id_admin' => 3,
            'check_in' => '2024-05-12',
            'check_out' => '2024-06-02',
        ],
        [
            'id_guest' => 10,
            'id_room' => 10,
            'id_admin' => 2,
            'check_in' => '2024-05-26',
            'check_out' => '2024-06-08',
        ],
        [
            'id_guest' => 11,
            'id_room' => 1,
            'id_admin' => 3,
            'check_in' => '2024-07-07',
            'check_out' => '2024-07-28',
        ],
        [
            'id_guest' => 12,
            'id_room' => 2,
            'id_admin' => 1,
            'check_in' => '2024-08-12',
            'check_out' => '2024-09-12',
        ],
    ];

    public function run()
    {
        DB::table('booking')->insert($this->bookings);
    }

}
