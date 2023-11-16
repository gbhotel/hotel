<?php

namespace Database\Seeders\rooms;

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
            'id_admin' => 2,
            'check_in' => '2023-07-15',
            'check_out' => '2023-07-25',
        ],
        [
            'id_guest' => 2,
            'id_room' => 2,
            'id_admin' => 2,
            'check_in' => '2023-07-15',
            'check_out' => '2023-08-02',
        ],
        [
            'id_guest' => 3,
            'id_room' => 3,
            'id_admin' => 3,
            'check_in' => '2023-08-05',
            'check_out' => '2023-08-23',
        ],
        [
            'id_guest' => 4,
            'id_room' => 4,
            'id_admin' => 4,
            'check_in' => '2023-08-06',
            'check_out' => '2023-08-16',
        ],
        [
            'id_guest' => 5,
            'id_room' => 5,
            'id_admin' => 2,
            'check_in' => '2023-09-12',
            'check_out' => '2023-09-28',
        ],
        [
            'id_guest' => 6,
            'id_room' => 6,
            'id_admin' => 3,
            'check_in' => '2023-09-19',
            'check_out' => '2023-09-25',
        ],
        [
            'id_guest' => 7,
            'id_room' => 7,
            'id_admin' => 2,
            'check_in' => '2023-10-11',
            'check_out' => '2023-10-21',
        ],
        [
            'id_guest' => 8,
            'id_room' => 8,
            'id_admin' => 4,
            'check_in' => '2023-10-15',
            'check_out' => '2023-10-25',
        ],
        //-----------------------------------------------
        [
            'id_guest' => 9,
            'id_room' => 9,
            'id_admin' => 3,
            'check_in' => '2023-09-15',
            'check_out' => '2024-01-03',
        ],
        [
            'id_guest' => 10,
            'id_room' => 10,
            'id_admin' => 2,
            'check_in' => '2023-09-26',
            'check_out' => '2024-01-14',
        ],
        [
            'id_guest' => 11,
            'id_room' => 1,
            'id_admin' => 3,
            'check_in' => '2023-10-01',
            'check_out' => '2024-02-01',
        ],
        [
            'id_guest' => 12,
            'id_room' => 2,
            'id_admin' => 4,
            'check_in' => '2023-10-08',
            'check_out' => '2024-01-20',
        ],
        [
            'id_guest' => 13,
            'id_room' => 3,
            'id_admin' => 4,
            'check_in' => '2023-10-12',
            'check_out' => '2024-01-18',
        ],
        [
            'id_guest' => 14,
            'id_room' => 4,
            'id_admin' => 2,
            'check_in' => '2023-10-15',
            'check_out' => '2024-02-12',
        ],
        //--------------------------------------------
        [
            'id_guest' => 15,
            'id_room' => 5,
            'id_admin' => 3,
            'check_in' => '2024-01-11',
            'check_out' => '2024-02-26',
        ],
        [
            'id_guest' => 16,
            'id_room' => 6,
            'id_admin' => 3,
            'check_in' => '2024-03-12',
            'check_out' => '2024-03-25',
        ],
        [
            'id_guest' => 17,
            'id_room' => 7,
            'id_admin' => 4,
            'check_in' => '2024-04-16',
            'check_out' => '2024-05-12',
        ],
        [
            'id_guest' => 18,
            'id_room' => 8,
            'id_admin' => 1,
            'check_in' => '2024-06-15',
            'check_out' => '2024-06-28',
        ],
        [
            'id_guest' => 19,
            'id_room' => 9,
            'id_admin' => 4,
            'check_in' => '2024-07-03',
            'check_out' => '2024-09-17',
        ],
        [
            'id_guest' => 20,
            'id_room' => 10,
            'id_admin' => 2,
            'check_in' => '2024-08-12',
            'check_out' => '2024-09-12',
        ],
    ];

    public function run()
    {
        DB::table('booking')->insert($this->bookings);
    }

}
