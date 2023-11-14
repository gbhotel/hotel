<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next) //: Response
    {

        // $role = 'none';
        // $user = Auth::user();
        // if ($user) {
        //     $role = DB::table('roles')->where('id', $user->role_id)->get()->first();
        //     $role = $role->name;
        // } else
        //     //dump($user);
        //     return redirect('/login');
        // return $next($request);
    }
}
