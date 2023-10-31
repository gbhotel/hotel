<?php

namespace Database\Seeders\rooms;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use function Laravel\Prompts\table;

class CategoriesSeeder extends Seeder
{
    public function run() {
        DB::table('categories')->insert($this->getCategories());
    }

    public function getCategories():array {
        return [
            1 => [
                'id' => 1,
                'category' => 'economy',
            ],
            2 => [
                'id' => 2,
                'category' => 'standard',
            ],
            3 => [
                'id' => 3,
                'category' => 'deluxe',
            ],
            4=> [
                'id' => 4,
                'category' => 'VIP',
            ]

        ];
    }
}
