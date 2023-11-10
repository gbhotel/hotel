<?php

namespace Database\Seeders\people;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('positions')->insert($this->getPositions());
    }

    public function getPositions():array {

        return [
            1 =>[
                'id' => 1,
                'name' => 'директор'
                ],
            2 =>[
                'id' => 2,
                'name' => 'администратор'
            ],
            3 => [
                'id' => 3,
                'name' => 'горничная'
            ],
            4 =>[
                'id' => 4,
                'name' => 'разнорабочий'
            ],
        ];
    }
}
