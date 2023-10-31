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
        $admins = [
            ['first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'phone' => fake()->phoneNumber(),
                'passport' => rand(100000, 999999),
                'position' => 1,
                'employment_date' => fake()->date()
            ],
            ['first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'phone' => fake()->phoneNumber(),
                'passport' => rand(100000, 999999),
                'position' => 1,
                'employment_date' => fake()->date()
            ],
        ];
        DB::table('staff')->insert($admins);
        DB::table('staff')->insert($this->getStaff());
    }

    public function getStaff(): array
    {
        $staff = [];
        $quantity = 10;

        for ($i = 1; $i <= $quantity; $i++) {
            $staff[] = [
                'first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'phone' => fake()->phoneNumber(),
                'passport' => rand(100000, 999999),
                'position' => fake()->numberBetween(2, 4),
                'employment_date' => fake()->date()
            ];
        }

        return $staff;
    }
}
