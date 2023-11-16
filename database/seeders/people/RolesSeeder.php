<?php

namespace Database\Seeders\people;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{
    public function run()
    {
        DB::table('roles')->insert($this->getRoles());
    }

    public function getRoles():array {

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
                'name' => 'гость'
            ],
        ];
    }
}
