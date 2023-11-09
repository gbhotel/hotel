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
            'Односпальная кровать',
            'Две односпальные кровати',
            'Двуспальная кровать'
        ];

        $toilets = [
            'В номере',
            'На этаже'
        ];

        $shower = [
            'В номере',
            'На этаже'
        ];

        $conditioner = [
            'Да',
            'Нет'
        ];



        $rooms = [];
        $quantity = 10;

        for($i = 1; $i <= $quantity; $i ++) {

            $comfort = [
                'wifi' =>'Да',
                'кондиционер' => $conditioner[fake()->numberBetween(0,1)],
                'кровать' => $beds[fake()->numberBetween(0,2)],
                'туалет' => $toilets[fake()->numberBetween(0,1)],
                'душ' => $shower[fake()->numberBetween(0,1)]
            ];

            $rooms[] = [
                'number' => $i,
                'id_category' => fake()->numberBetween(1,4),
                'comfort' => json_encode($comfort),
            ];
        }

        return $rooms;
    }
}
