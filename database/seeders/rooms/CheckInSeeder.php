<?php

namespace Database\Seeders\rooms;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CheckInSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    private array $checkIn = [
        [
            'id_booking' => 1,
            'id_admin' => 1,
            'checkIn' => '2023-07-12',
            'checkOut' => '2023-07-24',
        ],
        [
            'id_booking' => 2,
            'id_admin' => 2,
            'checkIn' => '2023-07-14',
            'checkOut' => '2023-07-22',
        ],
        [
            'id_booking' => 3,
            'id_admin' => 3,
            'checkIn' => '2023-08-05',
            'checkOut' => '2023-08-17',
        ],
        [
            'id_booking' => 4,
            'id_admin' => 5,
            'checkIn' => '2023-08-12',
            'checkOut' => '2023-08-21',
        ],
        [
            'id_booking' => 5,
            'id_admin' => 2,
            'checkIn' => '2023-09-03',
            'checkOut' => '2023-12-28',
        ],
        [
            'id_booking' => 6,
            'id_admin' => 3,
            'checkIn' => '2023-09-12',
            'checkOut' => '2023-12-26',
        ],
        [
            'id_booking' => 7,
            'id_admin' => 2,
            'checkIn' => '2023-10-03',
            'checkOut' => '2024-01-02',
        ],
        [
            'id_booking' => 8,
            'id_admin' => 1,
            'checkIn' => '2023-10-03',
            'checkOut' => '2024-01-11',
        ],
    ];
    public function run(): void
    {
        DB::table('check_in')->insert($this->checkIn);
    }

//    public function getCheckIn():array {
//
//        $checkIn = [];
//        $quantity = 10;
//
//        for($i = 1; $i <= $quantity; $i ++) {
//
//            $checkIn[] = [
//                'id_admin' => fake()->numberBetween(1, 2),
//                'id_booking' => fake()->numberBetween(1, 10),
//                'checkIn' => fake()->dateTimeBetween('2022-10-15', '2022-10-31'),
//                'checkOut' => fake()->dateTimeBetween('2022-10-16', '2022-11-01'),
//            ];
//        }
//        return $checkIn;
//    }
}
