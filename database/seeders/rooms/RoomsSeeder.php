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
            'Три односпальные кровати',
            'Двуспальная кровать',
            'Двуспальная и односпальная кровать'
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

        $sets = [
            [
                "полотенце" => 6,
                "халат" => 3,
                "тапочки" => 3,
                "шампунь" => 3,
                "гель для душа" => 3
            ],
            [
                "полотенце" => 6,
                "халат" => 2,
                "тапочки" => 2,
                "шампунь" => 2,
                "гель для душа" => 2
            ],
            [
                "полотенце" => 8,
                "халат" => 2,
                "тапочки" => 2,
                "шампунь" => 2,
                "гель для душа" => 2
            ],
            [
                "полотенце" => 10,
                "халат" => 2,
                "тапочки" => 2,
                "шампунь" => 2,
                "гель для душа" => 2
            ],
            [
                "полотенце" => 15,
                "халат" => 2,
                "тапочки" => 3,
                "шампунь" => 3,
                "гель для душа" => 3
            ],

        ];
        $price = [
            2500,
            3500,
            5000,
            7000,
            8000,
        ];

        $additional_guest = [
            500,
            1000,
            2000,
        ];



        $rooms = [];
        $quantity = 10;

        for($i = 1; $i <= $quantity; $i ++) {



            $comfort = [
                'wifi' =>'Да',
                'conditioner' => $conditioner[fake()->numberBetween(0,1)],
                'bed' => $beds[fake()->numberBetween(0,4)],
                'toilet' => $toilets[fake()->numberBetween(0,1)],
                'shower' => $shower[fake()->numberBetween(0,1)],
                'roomsNumber' => fake()->numberBetween(1,3)
            ];

            $rooms[] = [
                'number' => $i,
                'id_category' => fake()->numberBetween(1,4),
                'price' => $price[fake()->numberBetween(0,4)],
                'additional_guest' => $price[fake()->numberBetween(0,2)],
                'max_guests' => fake()->numberBetween(1,3),
                'comfort' => json_encode($comfort),
                'sets' => json_encode($sets[fake()->numberBetween(0,4)])
            ];
        }

        return $rooms;
    }
}
