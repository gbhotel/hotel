<?php

namespace Database\Seeders\people;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('roles')->insert($this->getRoles());
    }

    public function getRoles():array {

        return [
            1 =>[
                'id' => 1,
                'role' => 'admin'
                ],
            2 =>[
                'id' => 2,
                'role' => 'manager'
            ],
            3 => [
                'id' => 3,
                'role' => 'cleaner'
            ],
            4 =>[
                'id' => 4,
                'role' => 'handyman'
            ],
        ];
    }
}
