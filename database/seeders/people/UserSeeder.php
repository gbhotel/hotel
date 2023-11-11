<?php

namespace Database\Seeders\people;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        \App\Models\User::query()->create([
            'first_name' => 'Владелец',
            'last_name' => 'Владыков',
            'username' => 'user11',
            'phone' => '89010000011',
            'email' => 'user11@htl.ru',
            'role_id' => 1,
            'password' => Hash::make(123),
        ]);
//---------------------------------------------------------
        \App\Models\User::query()->create([
            'first_name' => 'Администратор',
            'last_name' => 'Жизни',
            'username' => 'user21',
            'phone' => '89020000021',
            'email' => 'user21@htl.ru',
            'role_id' => 2,
            'password' => Hash::make(123),
        ]);
        \App\Models\User::query()->create([
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'username' => 'user22',
            'phone' => '89020000022',
            'email' => 'user22@htl.ru',
            'role_id' => 2,
            'password' => Hash::make(123),
        ]);
        \App\Models\User::query()->create([
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'username' => 'user23',
            'phone' => '89020000023',
            'email' => 'user23@htl.ru',
            'role_id' => 2,
            'password' => Hash::make(123),
        ]);
//---------------------------------------------------------
        \App\Models\User::query()->create([
            'first_name' => 'Горничная',
            'last_name' => 'Мойдодыр',
            'username' => 'user31',
            'phone' => '89030000031',
            'email' => 'user31@htl.ru',
            'role_id' => 3,
            'password' => Hash::make(123),
        ]);
        \App\Models\User::query()->create([
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'username' => 'user32',
            'phone' => '89030000032',
            'email' => 'user32@htl.ru',
            'role_id' => 3,
            'password' => Hash::make(123),
        ]);
        \App\Models\User::query()->create([
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'username' => 'user33',
            'phone' => '89030000033',
            'email' => 'user33@htl.ru',
            'role_id' => 3,
            'password' => Hash::make(123),
        ]);
//---------------------------------------------------------
        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user41',
            'phone' => '89040000041',
            'email' => 'user41@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user42',
            'phone' => '89040000042',
            'email' => 'user42@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user43',
            'phone' => '89040000043',
            'email' => 'user43@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user44',
            'phone' => '89040000044',
            'email' => 'user44@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user45',
            'phone' => '89040000045',
            'email' => 'user45@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user46',
            'phone' => '89040000046',
            'email' => 'user46@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user47',
            'phone' => '89040000047',
            'email' => 'user47@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user48',
            'phone' => '89040000048',
            'email' => 'user48@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user49',
            'phone' => '89040000049',
            'email' => 'user49@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user50',
            'phone' => '89040000050',
            'email' => 'user50@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
        ]);

        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user51',
            'phone' => '89040000051',
            'email' => 'user51@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
        ]);

        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user52',
            'phone' => '89040000052',
            'email' => 'user52@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
        ]);

        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user53',
            'phone' => '89040000053',
            'email' => 'user53@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
        ]);

        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user54',
            'phone' => '89040000054',
            'email' => 'user54@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
        ]);

        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user55',
            'phone' => '89040000055',
            'email' => 'user55@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
        ]);

        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user56',
            'phone' => '89040000056',
            'email' => 'user56@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user57',
            'phone' => '89040000057',
            'email' => 'user57@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user58',
            'phone' => '89040000058',
            'email' => 'user58@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user59',
            'phone' => '89040000059',
            'email' => 'user59@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user60',
            'phone' => '89040000060',
            'email' => 'user60@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
        ]);
    }
}
