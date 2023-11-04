<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StaffController extends Controller
{
    public function getStaff() {

       $staff =  DB::table('staff')->get();

       return response()->json($staff);
    }
}
