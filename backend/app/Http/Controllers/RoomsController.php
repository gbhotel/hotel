<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class RoomsController extends Controller
{
    public function getRooms ()
    {
        $rooms = DB::table("rooms")->get(['id', 'number', 'status']);
        return response()->json($rooms);
    }
}
