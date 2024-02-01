<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AuthController extends Controller
{
    public function getRole()
    {
        $data['role'] = 'none';
        $user = Auth::user();
        if ($user) {
            $role = DB::table('roles')->where('id', $user->role_id)->get()->first();
            $data['role'] = $role->name;
        }
        return response()->json($data);
    }

    public function isAuth()
    {
        $data['auth'] = 'false';
        $user = Auth::user();
        if ($user) $data['auth'] = 'true';
        return response()->json($data);
    }

    public static function getCurrentRoleName()
    {
        $role = 'none';
        $user = Auth::user();
        if ($user) {
            $role = DB::table('roles')->where('id', $user->role_id)->get()->first();
            $role = $role->name;
        }
        return $role;
    }

    public function getCurrentUser() {

        $user = Auth::user();
        return response()->json($user);
    }

    public function update(Request $request) {

        $user = auth()->user();

        $data = $request->all();

        if(!$data) {
            throw new HttpException(400,'Отсутствуют данные');
        }

//        dd($data['employee']);

        if($data['employee']) {

            $employeeData = json_decode($data['employee'], true);

            $validator = Validator::make($employeeData, [
                'last_name' => 'required|string|max:255',
                 'first_name' => 'required|string|max:255',
                 'phone' => 'required|regex:/^\+?\d{10,14}$/',
                 'email' => 'required|email|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

        $user->update([
                'first_name' => $employeeData['first_name'],
                'last_name' => $employeeData['last_name'],
                'phone' => $employeeData['phone'],
                'email' => $employeeData['email'],
                'gender' => $employeeData['gender'],
                'birthday' => $employeeData['birthday'],
            ]);
        }


        if($request->file('avatar') && $request->file('avatar')->isValid()) {

            $avatarName = $user->getAuthIdentifier() . time();

            $path = Storage::url('img/avatars/' . $avatarName);

            $request->file('avatar')->storeAs('img/avatars', $avatarName, 'public');

            $user->update([
                'photo' => $path
                ]);
        }

    }
}
