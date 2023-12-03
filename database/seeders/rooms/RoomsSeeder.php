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

        $rooms = [];

        $img = [
            'economy' => [
                'img/rooms/economy1.jpg',
                'img/rooms/economy2.jpg',
                'img/rooms/economy3.jpg',
            ],
            'standard' => [
                'img/rooms/standard1.jpg',
                'img/rooms/standard2.jpg',
                'img/rooms/standard3.jpg',
            ],
            'deluxe' => [
                'img/rooms/deluxe1.jpg',
                'img/rooms/deluxe2.jpg',
                'img/rooms/deluxe3.jpg',
            ],
            'vip' => [
                'img/rooms/vip1.jpg',
                'img/rooms/vip2.jpg',
                'img/rooms/vip3.jpg',
            ]
        ];

        $rooms[] = [
            'number' => 1,
            'images' => json_encode($img['economy']),
            'id_category' => 1,
            'price' => 2500,
            'additional_guest' => 500,
            'max_guests' => 2,
            'comfort' => json_encode(
                [
                    'wifi' =>'Да',
                    'conditioner' => 'Да',
                    'bed' => 'Две односпальные кровати',
                    'toilet' => 'на этаже',
                    'shower' => 'на этаже',
                    'roomsNumber' => 1
                ]),
            'sets' => json_encode(
                [
                "полотенце" => 6,
                "халат" => 2,
                "тапочки" => 2,
                "шампунь" => 2,
                "гель для душа" => 2
                ])
        ];

        $rooms[] = [
            'number' => 2,
            'images' => json_encode($img['economy']),
            'id_category' => 1,
            'price' => 2500,
            'additional_guest' => 500,
            'max_guests' => 2,
            'comfort' => json_encode(
                [
                    'wifi' =>'Да',
                    'conditioner' => 'Да',
                    'bed' => 'Две односпальные кровати',
                    'toilet' => 'на этаже',
                    'shower' => 'на этаже',
                    'roomsNumber' => 1
                ]),
            'sets' => json_encode(
                [
                    "полотенце" => 6,
                    "халат" => 2,
                    "тапочки" => 2,
                    "шампунь" => 2,
                    "гель для душа" => 2
                ])
        ];

        $rooms[] = [
            'number' => 3,
            'images' => json_encode($img['economy']),
            'id_category' => 1,
            'price' => 3500,
            'additional_guest' => 500,
            'max_guests' => 3,
            'comfort' => json_encode(
                [
                    'wifi' =>'Да',
                    'conditioner' => 'Да',
                    'bed' => 'Три односпальные кровати',
                    'toilet' => 'на этаже',
                    'shower' => 'на этаже',
                    'roomsNumber' => 2
                ]),
            'sets' => json_encode(
                [
                    "полотенце" => 9,
                    "халат" => 3,
                    "тапочки" => 3,
                    "шампунь" => 3,
                    "гель для душа" => 3
                ])
        ];

        $rooms[] = [
            'number' => 4,
            'images' => json_encode($img['standard']),
            'id_category' => 2,
            'price' => 4000,
            'additional_guest' => 1000,
            'max_guests' => 2,
            'comfort' => json_encode(
                [
                    'wifi' =>'Да',
                    'conditioner' => 'Да',
                    'bed' => 'Двуспальная кровать',
                    'toilet' => 'в номере',
                    'shower' => 'в номере',
                    'roomsNumber' => 1
                ]),
            'sets' => json_encode(
                [
                    "полотенце" => 8,
                    "халат" => 2,
                    "тапочки" => 2,
                    "шампунь" => 2,
                    "гель для душа" => 2
                ])
        ];

        $rooms[] = [
            'number' => 5,
            'images' => json_encode($img['standard']),
            'id_category' => 2,
            'price' => 5000,
            'additional_guest' => 1000,
            'max_guests' => 3,
            'comfort' => json_encode(
                [
                    'wifi' =>'Да',
                    'conditioner' => 'Да',
                    'bed' => 'Двуспальная и односпальная кровати',
                    'toilet' => 'в номере',
                    'shower' => 'в номере',
                    'roomsNumber' => 2
                ]),
            'sets' => json_encode(
                [
                    "полотенце" => 12,
                    "халат" => 3,
                    "тапочки" => 3,
                    "шампунь" => 3,
                    "гель для душа" => 3
                ])
        ];

        $rooms[] = [
            'number' => 6,
            'images' => json_encode($img['standard']),
            'id_category' => 2,
            'price' => 7000,
            'additional_guest' => 1000,
            'max_guests' => 4,
            'comfort' => json_encode(
                [
                    'wifi' =>'Да',
                    'conditioner' => 'Да',
                    'bed' => 'Двуспальная и две односпальные кровати',
                    'toilet' => 'в номере',
                    'shower' => 'в номере',
                    'roomsNumber' => 3
                ]),
            'sets' => json_encode(
                [
                    "полотенце" => 16,
                    "халат" => 4,
                    "тапочки" => 4,
                    "шампунь" => 4,
                    "гель для душа" => 4
                ])
        ];

        $rooms[] = [
            'number' => 7,
            'images' => json_encode($img['deluxe']),
            'id_category' => 3,
            'price' => 5000,
            'additional_guest' => 1500,
            'max_guests' => 2,
            'comfort' => json_encode(
                [
                    'wifi' =>'Да',
                    'conditioner' => 'Да',
                    'bed' => 'Двуспальная кровать',
                    'toilet' => 'в номере',
                    'shower' => 'в номере',
                    'roomsNumber' => 2
                ]),
            'sets' => json_encode(
                [
                    "полотенце" => 10,
                    "халат" => 2,
                    "тапочки" => 2,
                    "шампунь" => 2,
                    "гель для душа" => 2
                ])
        ];

        $rooms[] = [
            'number' => 8,
            'images' => json_encode($img['deluxe']),
            'id_category' => 3,
            'price' => 7000,
            'additional_guest' => 1500,
            'max_guests' => 3,
            'comfort' => json_encode(
                [
                    'wifi' =>'Да',
                    'conditioner' => 'Да',
                    'bed' => 'Двуспальная кровать и односпальная кровать',
                    'toilet' => 'в номере',
                    'shower' => 'в номере',
                    'roomsNumber' => 2
                ]),
            'sets' => json_encode(
                [
                    "полотенце" => 15,
                    "халат" => 3,
                    "тапочки" => 3,
                    "шампунь" => 3,
                    "гель для душа" => 3
                ])
        ];

        $rooms[] = [
            'number' => 9,
            'images' => json_encode($img['vip']),
            'id_category' => 4,
            'price' => 7000,
            'additional_guest' => 1700,
            'max_guests' => 2,
            'comfort' => json_encode(
                [
                    'wifi' =>'Да',
                    'conditioner' => 'Да',
                    'bed' => 'Двуспальная кровать KING SIZE',
                    'toilet' => 'в номере',
                    'shower' => 'в номере',
                    'roomsNumber' => 2
                ]),
            'sets' => json_encode(
                [
                    "полотенце" => 10,
                    "халат" => 2,
                    "тапочки" => 2,
                    "шампунь" => 2,
                    "гель для душа" => 2
                ])
        ];

        $rooms[] = [
            'number' => 10,
            'images' => json_encode($img['vip']),
            'id_category' => 4,
            'price' => 9000,
            'additional_guest' => 1700,
            'max_guests' => 3,
            'comfort' => json_encode(
                [
                    'wifi' =>'Да',
                    'conditioner' => 'Да',
                    'bed' => 'Двуспальная (king size) и односпальная кровати',
                    'toilet' => 'в номере',
                    'shower' => 'в номере',
                    'roomsNumber' => 3
                ]),
            'sets' => json_encode(
                [
                    "полотенце" => 15,
                    "халат" => 3,
                    "тапочки" => 3,
                    "шампунь" => 3,
                    "гель для душа" => 3
                ])
        ];

        return $rooms;
    }
}
