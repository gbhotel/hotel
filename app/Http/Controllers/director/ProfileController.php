<?php

namespace App\Http\Controllers\director;

use App\Http\Controllers\Controller;
use App\Models\Positions;
use App\Models\Staff;
use DateTime;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use function Laravel\Prompts\table;

class ProfileController extends Controller
{
    public function getMyData()
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

    public function updateMyData(Request $request)
    {
        $person = $request->all();

        $data = [];
        $data['username'] = DB::table('users')
            ->select('username')
            ->where('username', '=', $person['username'])
            ->whereNot('id', '=', $person['userId'])
            ->exists();
        $data['passport'] = DB::table('users')
            ->select('passport')
            ->where('passport', '=', $person['passport'])
            ->whereNot('id', '=', $person['userId'])
            ->exists();
        $data['email'] = DB::table('users')
            ->select('email')
            ->where('email', '=', $person['email'])
            ->whereNot('id', '=', $person['userId'])
            ->exists();
        $data['phone'] = DB::table('users')
            ->select('phone')
            ->where('phone', '=', $person['phone'])
            ->whereNot('id', '=', $person['userId'])
            ->exists();

        if($data['username'] || $data['passport'] || $data['email'] || $data['phone'] ){
            $data['validation'] = 'bad';
            return response()->json($data);
        }

        $employee = ['id_position' => $person['position'], 'employment_date' => $person['employment_date']];
        $userId = $person['userId'];

        unset($person['position']);
        unset($person['_token']);
        unset($person['userId']);
        unset($person['employment_date']);

        try{
            $upUser = DB::table('users')->where('id', $userId)->update([...$person]);

            $upStaff = DB::table('staff')->where('id_user', $userId)->update([...$employee]);

        }catch (\Exception $e){

            $data['saveUser'] = 'bad';
            $data['error'] = $e->getMessage();

            return response()->json($data);
        }

        $data['validation'] = 'good';
        $data['updataUser'] = 'good';
        $data['updataUserStr'] = $upUser;
        $data['updataStaffStr'] = $upStaff;

        return response()->json($data);
    }

    public function changePassword(Request $request){
        $person = $request->all();
        $arrPass = [...$person];
        $arrPass['state'] = 'Good';

        //Проверка правености старого пароля
        if(!Hash::check($arrPass['password1'], auth()->user()->password)){
            $arrPass['verification'] = 'Bad';
            $arrPass['state'] = 'Bad';
            $arrPass['message'] = 'Вы не верно ввели старый парой.';
        }else{
            $arrPass['verification'] = 'Good';
            $hashPass = Hash::make($arrPass['password2']);
            $user = Auth::user();
            $change = DB::table('users')
                ->where('id', '=', $user->id)
                ->update(['password' => $hashPass]);
            if($change === 0){
                $arrPass['state'] = 'Bad';
                $arrPass['DB'] = 'Bad';
                $arrPass['message'] = 'Не удалось сохранить новый пароль в базу данных';
            }else{
                $arrPass['DB'] = 'Good';
            }

        }

        if($arrPass['state'] === 'Good' && $arrPass['DB'] === 'Good' && $arrPass['verification'] === 'Good'){
            $arrPass['message'] = 'Пароль успешно изменен';
        }

        return response()->json($arrPass);
    }

    public function changePhoto(Request $request)
    {
        $answer = [];

        if (!$request->hasFile('photo')) {
            $answer['load'] = 'false';
            $answer['message'] = 'Сервер не получил файл или файл не пригоден для сохранения';
            return response()->json($answer);
        }else{
            $answer['load'] = 'true';
        }

        //Оригинальное имя файла
        $newFileName = $request->file('photo')->getClientOriginalName();
        //Путь к файлу до сохранения
        $path = $request->file('photo')->path();
        //Получаем расширение файла
        $path_parts = pathinfo($path . '/' . $newFileName, PATHINFO_EXTENSION);

        $user = Auth::user();
        $idUser = $user->id;
        $oldPathPhoto = $user->photo;
        $answer['oldPath'] = $oldPathPhoto;

        $dateObj = new DateTime();
        //Строка из даты и времени без разделителей
        $dateTimeStr = $dateObj->format('dmYhHis');

        //Формируем имя файла для сохранения в базу данных
        $newFileName = 'avatar-' . $idUser . '-' . $dateTimeStr . '.' . $path_parts;

        $urlFull = Storage::url(Storage::putFileAs('/public/img/avatar', $request->file('photo'), $newFileName));

        if(!is_string($urlFull)){
            $answer['save'] = 'false';
            $answer['message'] = 'Неудалось сохранить файл на сервере. При попытке сохранить файл, не получен путь к сохраняемому файлу.';
            return response()->json($answer);
        }

        $arrPath = explode('/', $urlFull, PHP_INT_MAX);

        if (count($arrPath) !== 5 || $arrPath[4] !== $newFileName) {
            $answer['save'] = 'false';
            $answer['message'] = 'Неудалось сохранить файл на сервере. При попытке сохранить файл, получен не коректный путь к сохраняемому файлу';
            return response()->json($answer);
        }
        $answer['save'] = 'true';
        $answer['path'] = $urlFull;

        $url = substr($urlFull, 1);

        $user->photo = $url;

        if(!$user->save()){
            $answer['bd'] = 'false';
            $answer['message'] = 'Не удалось обновить путь к файлу в базе данных';
            return response()->json($answer);
        }
        $answer['bd'] = 'true';

        $length = explode('/', $oldPathPhoto, PHP_INT_MAX);
        unset($length[0]);
        $urlRemove = 'public/' . implode ('/', $length);


        if(Storage::delete($urlRemove)){
            $answer['remove'] = 'true';
            $answer['message'] = 'Ваша аватарка успешно изменена';

        }else{
            $answer['remove'] = 'false';
            $answer['message'] = 'Ваша аватарка успешно изменена. Не получилось удалить фтарый файл';

        }
        return response()->json($answer);
    }
}
