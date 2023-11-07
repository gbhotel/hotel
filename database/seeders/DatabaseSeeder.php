<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Seeders\people\GuestsSeeder;
use Database\Seeders\people\RolesSeeder;
use Database\Seeders\people\StaffSeeder;
use Database\Seeders\rooms\BookingSeeder;
use Database\Seeders\rooms\CategoriesSeeder;
use Database\Seeders\rooms\CheckInSeeder;
use Database\Seeders\rooms\RoomsSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CategoriesSeeder::class,
            RoomsSeeder::class,
            GuestsSeeder::class,
            RolesSeeder::class,
            StaffSeeder::class,
            BookingSeeder::class,
            CheckInSeeder::class
        ]);

        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
