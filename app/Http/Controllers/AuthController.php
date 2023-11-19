<?php

namespace App\Http\Controllers;

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

    public function getIdCurrentUser() {

        $user = Auth::user();
//        if ($user) {
//            $id = DB::table('users')
//                    ->find($id);
//        }
        return response()->json($user->id);
    }
}
