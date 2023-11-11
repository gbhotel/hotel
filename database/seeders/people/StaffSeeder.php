<?php

namespace Database\Seeders\people;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $director = [
            'id_position' => 1,
            'id_user' => 1,
            'employment_date' => '2022-05-10'
        ];

        $admins = [
            [
                'id_position' => 2,
                'id_user' => 2,
                'employment_date' => '2022-06-11'
            ],
            [
                'id_position' => 2,
                'id_user' => 3,
                'employment_date' => '2022-08-12'
            ],
            [
                'id_position' => 2,
                'id_user' => 4,
                'employment_date' => '2022-11-13'
            ],
        ];
        $maids = [
            [
                'id_position' => 3,
                'id_user' => 5,
                'employment_date' => '2022-07-11'
            ],
            [
                'id_position' => 3,
                'id_user' => 6,
                'employment_date' => '2022-10-12'
            ],
            [
                'id_position' => 3,
                'id_user' => 7,
                'employment_date' => '2023-02-13'
            ],
        ];

        DB::table('staff')->insert($director);
        DB::table('staff')->insert($admins);
        DB::table('staff')->insert($maids);
    }
}
