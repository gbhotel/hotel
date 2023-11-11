<?php

namespace Database\Seeders;

use Database\Seeders\people\GuestsSeeder;
use Database\Seeders\people\PositionSeeder;
use Database\Seeders\people\RolesSeeder;
use Database\Seeders\people\StaffSeeder;
use Database\Seeders\people\UserSeeder;
use Database\Seeders\rooms\BookingSeeder;
use Database\Seeders\rooms\CategoriesSeeder;
use Database\Seeders\rooms\CheckInSeeder;
use Database\Seeders\rooms\RoomsSeeder;
use Database\Seeders\tasks\TasksSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolesSeeder::class,
            PositionSeeder::class,
            CategoriesSeeder::class,
            RoomsSeeder::class,
            UserSeeder::class,
            StaffSeeder::class,
            GuestsSeeder::class,
            BookingSeeder::class,
            CheckInSeeder::class,
            TasksSeeder::class,
        ]);
    }
}
