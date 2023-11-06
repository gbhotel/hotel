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
            $data['role'] = $role->role;
        }
        return response()->json($data);
    }
}
