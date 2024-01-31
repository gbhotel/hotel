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
            'birthday' => '1990-12-11',
            'gender' => 'м',
            'passport' => '987001',
            'photo' => '../img/director.jpg'
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
            'passport' => '987002',
            'birthday' => '1986-09-09',
            'gender' => 'м',
            'photo' => '../img/admin1.png'
        ]);
        \App\Models\User::query()->create([
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'username' => 'user22',
            'phone' => '89020000022',
            'email' => 'user22@htl.ru',
            'role_id' => 2,
            'password' => Hash::make(123),
            'passport' => '987003',
            'birthday' => '1976-10-09',
            'gender' => 'ж',
            'photo' => null
        ]);
        \App\Models\User::query()->create([
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'username' => 'user23',
            'phone' => '89020000023',
            'email' => 'user23@htl.ru',
            'role_id' => 2,
            'password' => Hash::make(123),
            'passport' => '987004',
            'birthday' => '1985-08-12',
            'gender' => 'м',
            'photo' => null
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
            'passport' => '987005',
            'birthday' => '1995-08-15',
            'gender' => 'ж',
            'photo' => '../img/maid1.jpg'
        ]);
        \App\Models\User::query()->create([
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'username' => 'user32',
            'phone' => '89030000032',
            'email' => 'user32@htl.ru',
            'role_id' => 3,
            'password' => Hash::make(123),
            'passport' => '987006',
            'birthday' => '1983-06-17',
            'gender' => 'ж',
            'photo' => '../img/maid1.jpg'
        ]);
        \App\Models\User::query()->create([
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'username' => 'user33',
            'phone' => '89030000033',
            'email' => 'user33@htl.ru',
            'role_id' => 3,
            'password' => Hash::make(123),
            'passport' => '987007',
            'birthday' => '1983-09-23',
            'gender' => 'м',
            'photo' => null
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
            'passport' => '987008',
            'birthday' => '1977-05-03',
            'gender' => 'м',
            'photo' => null
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user42',
            'phone' => '89040000042',
            'email' => 'user42@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
            'passport' => '987009',
            'birthday' => '1971-10-03',
            'gender' => 'м',
            'photo' => null
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user43',
            'phone' => '89040000043',
            'email' => 'user43@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
            'passport' => '987010',
            'birthday' => '1978-10-06',
            'gender' => 'м',
            'photo' => null
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user44',
            'phone' => '89040000044',
            'email' => 'user44@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
            'passport' => '987011',
            'birthday' => '1998-02-06',
            'gender' => 'м',
            'photo' => null
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user45',
            'phone' => '89040000045',
            'email' => 'user45@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
            'passport' => '987012',
            'birthday' => '1998-05-06',
            'gender' => 'м',
            'photo' => null
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Наталья',
            'last_name' => 'Иванова',
            'username' => 'user46',
            'phone' => '89040000046',
            'email' => 'user46@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
            'passport' => '987013',
            'birthday' => '1998-05-06',
            'gender' => 'ж',
            'photo' => null
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Нина',
            'last_name' => 'Петрова',
            'username' => 'user47',
            'phone' => '89040000047',
            'email' => 'user47@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
            'passport' => '987014',
            'birthday' => '1977-01-21',
            'gender' => 'ж',
            'photo' => null
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Татьяна',
            'last_name' => 'Светлова',
            'username' => 'user48',
            'phone' => '89040000048',
            'email' => 'user48@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
            'passport' => '987015',
            'birthday' => '1976-09-21',
            'gender' => 'ж',
            'photo' => null
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Петр',
            'last_name' => 'Крысин',
            'username' => 'user49',
            'phone' => '89040000049',
            'email' => 'user49@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
            'passport' => '987016',
            'birthday' => '1976-04-11',
            'gender' => 'м',
            'photo' => null
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Николай',
            'last_name' => 'Куликов',
            'username' => 'user50',
            'phone' => '89040000050',
            'email' => 'user50@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
            'passport' => '987017',
            'birthday' => '1956-04-11',
            'gender' => 'м',
            'photo' => null
        ]);

        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user51',
            'phone' => '89040000051',
            'email' => 'user51@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
            'passport' => '987018',
            'birthday' => '1977-03-19',
            'gender' => 'м',
            'photo' => null
        ]);

        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user52',
            'phone' => '89040000052',
            'email' => 'user52@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
            'passport' => '987019',
            'birthday' => '1956-03-16',
            'gender' => 'м',
            'photo' => null
        ]);

        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user53',
            'phone' => '89040000053',
            'email' => 'user53@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
            'passport' => '987020',
            'birthday' => '1989-04-19',
            'gender' => 'м',
            'photo' => null
        ]);

        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user54',
            'phone' => '89040000054',
            'email' => 'user54@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
            'passport' => '987021',
            'birthday' => '1980-08-14',
            'gender' => 'м',
            'photo' => null
        ]);

        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user55',
            'phone' => '89040000055',
            'email' => 'user55@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
            'passport' => '987022',
            'birthday' => '1989-04-19',
            'gender' => 'м',
            'photo' => null
        ]);

        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user56',
            'phone' => '89040000056',
            'email' => 'user56@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
            'passport' => '987023',
            'birthday' => '1989-04-19',
            'gender' => 'м',
            'photo' => null
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user57',
            'phone' => '89040000057',
            'email' => 'user57@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
            'passport' => '987024',
            'birthday' => '1989-04-19',
            'gender' => 'м',
            'photo' => null
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user58',
            'phone' => '89040000058',
            'email' => 'user58@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
            'passport' => '987025',
            'birthday' => '1989-04-19',
            'gender' => 'м',
            'photo' => null
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user59',
            'phone' => '89040000059',
            'email' => 'user59@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
            'passport' => '987026',
            'birthday' => '1989-04-19',
            'gender' => 'м',
            'photo' => null
        ]);
        \App\Models\User::query()->create([
            'first_name' => 'Гость',
            'last_name' => 'Вася',
            'username' => 'user60',
            'phone' => '89040000060',
            'email' => 'user60@htl.ru',
            'role_id' => 4,
            'password' => Hash::make(123),
            'passport' => '987027',
            'birthday' => '1989-04-19',
            'gender' => 'м',
            'photo' => null
        ]);
    }
}
