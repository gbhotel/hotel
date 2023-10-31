<?php

namespace Database\Seeders\rooms;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Generator as Faker;

class CheckInSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('check_in')->insert($this->getCheckIn());
    }

    public function getCheckIn():array {

        $faker = new Faker();
        $checkIn = [];
        $quantity = 10;

        for($i = 1; $i <= $quantity; $i ++) {

            $checkIn[] = [
                'id_admin' => fake()->numberBetween(1, 2),
                'id_booking' => fake()->numberBetween(1, 10),
                'checkIn' => fake()->dateTimeBetween('2022-10-15', '2022-10-31'),
                'checkOut' => fake()->dateTimeBetween('2022-10-16', '2022-11-01'),
            ];
        }
        return $checkIn;
    }
}
