<?php

namespace App\Http\Controllers\guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GuestController extends Controller
{
    public  function getRequests() {
       $guestRequests =  DB::table('guest_requests')
            ->get();

       return response()->json($guestRequests);
    }
}