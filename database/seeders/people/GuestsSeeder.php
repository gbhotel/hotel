<?php

namespace Database\Seeders\people;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GuestsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {

        DB::table('guests')->insert($this->getGuests());

    }

    public function getGuests():array {
        $guests = [];
        $quantity = 12;

        for($i = 1; $i <= $quantity; $i ++) {

            $guests[] = [
                'first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'phone' => fake()->phoneNumber(),
                'passport' => rand(100000,999999),
            ];
        }

        return $guests;
    }
}
