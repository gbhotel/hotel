<?php

namespace Database\Seeders\rooms;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomsSeeder extends Seeder
{
    public function run() {
        DB::table('rooms')->insert($this->getRooms());
    }

    public function getRooms():array {

        $array = [];
        $quantity = 10;
        for($i = 1; $i <= $quantity; $i ++) {
            $array[] = [
                'number' => $i,
                'id_category' => fake()->numberBetween(1,4),
                'id_status' => fake()->numberBetween(1,4),
            ];
        }
        return $array;
    }

}
