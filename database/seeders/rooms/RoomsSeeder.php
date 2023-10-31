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

        $beds = [
            'single bed',
            'twin size bed',
            'two single bed'
        ];

        $toilets = [
            'in the room',
            'on the floor'
        ];

        $shower = [
            'in the room',
            'on the floor'
        ];



        $rooms = [];
        $quantity = 10;

        for($i = 1; $i <= $quantity; $i ++) {

            $comfort = [
                'wifi' =>'WIFI',
                'bed' => $beds[fake()->numberBetween(0,2)],
                'toilet' => $toilets[fake()->numberBetween(0,1)],
                'shower' => $shower[fake()->numberBetween(0,1)],
                'roomsNumber' => fake()->numberBetween(1,3)
            ];

            if($comfort['toilet'] == 'on the floor' || $comfort['shower'] == 'on the floor' ) {
                $id_status = 1;
            } elseif ($comfort['roomsNumber'] == 2) {
                $id_status = 3;
            }elseif ($comfort['roomsNumber'] == 3) {
                $id_status = 4;
            } else {
                $id_status = 2;
            }

            $rooms[] = [
                'number' => $i,
                'id_category' => fake()->numberBetween(1,4),
                'id_status' => $id_status,
                'comfort' => json_encode($comfort),
            ];
        }

        return $rooms;
    }

}
