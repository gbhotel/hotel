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
        $quantity = 27;

        for($i = 8; $i <= $quantity; $i ++) {

            $guests[] = [
                'id_user' => $i,
            ];
        }

        return $guests;
    }
}
