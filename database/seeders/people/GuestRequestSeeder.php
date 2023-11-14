<?php

namespace Database\Seeders\people;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GuestRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('guest_requests')->insert($this->getGuestRequests());
    }

    public function getGuestRequests() {

        $requests = [];

        $requests [] = [
            'name'=> 'ремонт',
            'id_room' => 3,
            'id_guest'=> 13,
            'created_date'=> date('2023-11-12'),
            'comment'=> 'сломался кран',
        ];

        $requests [] = [
            'name'=> 'ремонт',
            'id_room' => 9,
            'id_guest'=> 9,
            'created_date'=> date('2023-11-12'),
            'comment'=> 'перегорела лампочка',
        ];

        $requests [] = [
            'name'=> 'услуги прачечной',
            'id_room' => 2,
            'id_guest'=> 12,
            'created_date'=> date('2023-11-12'),
            'comment'=> null,
        ];

        return $requests;

    }
}
