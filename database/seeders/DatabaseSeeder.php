<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Seeders\people\GuestsSeeder;
use Database\Seeders\people\PositionSeeder;
use Database\Seeders\people\RolesSeeder;
use Database\Seeders\people\StaffSeeder;
use Database\Seeders\rooms\BookingSeeder;
use Database\Seeders\rooms\CategoriesSeeder;
use Database\Seeders\rooms\CheckInSeeder;
use Database\Seeders\rooms\RoomsSeeder;
use Database\Seeders\tasks\TasksSeeder;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

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
            PositionSeeder::class,
            StaffSeeder::class,
            BookingSeeder::class,
            CheckInSeeder::class,
            TasksSeeder::class,
            RolesSeeder::class
        ]);

        \App\Models\User::query()->create([
            'first_name' => 'Владелец',
            'last_name' => 'Владыков',
            'username' => 'user1',
            'phone' => '89997654321',
            'email' => 'user1@htl.ru',
            'role_id' => 1,
            'password' => Hash::make(123),
        ]);

        \App\Models\User::query()->create([
            'first_name' => 'Администратор',
            'last_name' => 'Жизни',
            'username' => 'user2',
            'phone' => '89997654322',
            'email' => 'user2@htl.ru',
            'role_id' => 2,
            'password' => Hash::make(123),
        ]);

        \App\Models\User::query()->create([
            'first_name' => 'Горничная',
            'last_name' => 'Мойдодыр',
            'username' => 'user3',
            'phone' => '89997654323',
            'email' => 'user3@htl.ru',
            'role_id' => 3,
            'password' => Hash::make(123),
        ]);

        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Василий',
            'username' => 'user4',
            'phone' => '89997654324',
            'email' => 'user4@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
        ]);
    }
}
