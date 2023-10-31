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
    public function run()
    {
        DB::table('booking')->insert($this->getBookings());
    }

    public function getBookings():array {

        $bookings = [];
        $quantity = 10;

        for($i = 1; $i <= $quantity; $i ++) {

            $bookings[] = [
                'id_guest' => fake()->numberBetween(1, 10),
                'id_room' =>fake()->numberBetween(1,10),
                'id_admin' => fake()->numberBetween(1,2),
                'check_in' => fake()->date(),
                'check_out' => fake()->date(),
            ];
        }

        return $bookings;
    }
}
