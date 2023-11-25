<?php

namespace App\Http\Controllers\director;

use App\Http\Controllers\Controller;
use App\Models\Positions;
use App\Models\Staff;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    public function getPosition()
    {

        $user = Auth::user();
        $staff = DB::table('staff')->where('id_user', '=', $user->id)->first('*');
        $positionObj = DB::table('positions')->where('id', '=', $staff->id_position)->first('*');
        $position = $positionObj->name;

        //Считаем возрост
        $birthday = new DateTime($user->birthday);
        $age = $birthday->diff(new DateTime)->format('%y');

        //Считаем стаж
        $createdAt = new DateTime($staff->employment_date); // дата рождения
        $experienceY = $createdAt->diff(new DateTime)->format('%y');
        $experienceM = $createdAt->diff(new DateTime)->format('%m');
        $experienceD = $createdAt->diff(new DateTime)->format('%d');

        $year = '';
        //Склоняем год
        if($experienceY == 1 || ($experienceY % 10) == 1){
            $year = 'г.';
        }elseif (($experienceY > 1 && $experienceY < 5) || (($experienceY % 10) > 1) && (($experienceY % 10) < 5)){
            $year = 'г.';
        }elseif (($experienceY > 4 && $experienceY < 11) || (($experienceY % 10) > 4 && ($experienceY % 10) <= 9) || ($experienceY % 10) == 0){
            $year = 'л.';
        }
        $experience = $experienceY . ' ' . $year . ' ' . $experienceM . 'м. ' . $experienceD . 'д.';

        //Форматируем даты
        $created_atObj = new DateTime($user->created_at);
        $created_at = $created_atObj->format('d.m.Y');
        $updated_atObj = new DateTime($user->updated_at);
        $updated_at = $updated_atObj->format('d.m.Y');
        $birthdayObj = new DateTime($user->birthday);
        $birthday = $birthdayObj->format('d.m.Y');




        $employmentObj = new DateTime($staff->employment_date);
        $employment = $employmentObj->format('d.m.Y');


        $user->position = $position;
        $user->employment = $employment;
        $user->age = $age . $year;
        $user->experience = $experience;

        $user->createdAt = $created_at;
        $user->updatedAt = $updated_at;
        $user->birthdayAt = $birthday;

        return response()->json($user);
    }
}
