<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class RoomsController extends Controller
{
    public function getRooms ()
    {
        $rooms = DB::table("rooms")->get(['id', 'number', 'id_status']);
        $status = DB::table('statuses')->get();

        $data = [];
        foreach ($rooms as $key => $room)
        {
            $data[$key]['id'] = $room->id;
            $data[$key]['number'] = $room->number;
            foreach ($status as $st)
            {
                if($st->id == $room->id_status){
                    $data[$key]['status'] = $st->status;
                    break;
                }
            }
        }
        return response()->json($data);
    }
}
