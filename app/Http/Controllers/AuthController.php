<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
//        if ($user) {
//            $id = DB::table('users')
//                    ->find($id);
//        }
        return response()->json($user);
    }

    public function update(Request $request) {

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'required|regex:/^\+?\d{10,14}$/',
            'email' => 'required|email|max:255',
            // Добавьте другие правила валидации для других полей, если необходимо
        ]);

        $data = $request->all();

        $user = auth()->user(); // Получаем текущего авторизованного пользователя

        $success = $user->update([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'phone' => $data['phone'],
            'email' => $data['email'],
            'photo' => $data['photo'],
            'gender' => $data['gender'],
            'birthday' => date($data['birthday']),
        ]);

        if ($success) {
            return response()->json(['message' => 'Профиль успешно обновлен!']);
        } else {
            return response()->json(['message' => 'Не удалось обновить профиль!'], 500);
        }

    }
}
