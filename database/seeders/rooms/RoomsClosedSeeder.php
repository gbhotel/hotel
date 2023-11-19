<?php

namespace Database\Seeders\rooms;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomsClosedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $arr = [
            'id_rooms' => 8,
            'closure_at' => '2023-11-05 8:00:00',
            'opening_at' => '2024-01-05 20:00:00',
            'employee' => 4,
            'description' => 'Косметический ремонт, замена мебели',
            'created_at' => '2023-11-04 8:00:00',
        ];

        DB::table('rooms_closed')->insert($arr);
    }
}
