<?php

namespace Database\Seeders\people;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GuestsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('guests')->insert($this->getGuests());

    }

    public function getGuests():array {
        $guests = [];
        $quantity = 20;

        for($i = 1; $i <= $quantity; $i ++) {

            $guests[] = [
                'id_user' => $i,
            ];
        }

        return $guests;
    }
}
