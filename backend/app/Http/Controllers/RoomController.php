<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoomController extends Controller
{
    public function getRoom($id)
    {
        $room = DB::table('rooms')->find($id);
        $comfort = json_decode($room->comfort);

        $room->wifi = $comfort->wifi;
        $room->bed = $comfort->bed;
        $room->toilet = $comfort->toilet;
        $room->shower = $comfort->shower;
        $room->roomsNumber = $comfort->roomsNumber;
        unset($room->comfort);

        return response()->json($room);
    }

    public function bookRoom(Request $request)
    {
        //Нужно дорабртать базу данных, пока костыли
        $data = $request->all();

        DB::table('rooms')
            ->where('id', $data['id_room'])
            ->update(['id_status' => 4]);

        $data['book'] = 'ok';

        return response()->json($data);
    }

    public function cancelBookRoom(Request $request)
    {
        //Нужно дорабртать базу данных, пока костыли
        $data = $request->all();

        DB::table('rooms')
            ->where('id', $data['id_room'])
            ->update(['id_status' => 1]);

        $data['free'] = 'ok';

        return response()->json($data);
    }

    public function checkInRoom(Request $request)
    {
        //Нужно дорабртать базу данных, пока костыли
        $data = $request->all();

        DB::table('rooms')
            ->where('id', $data['id_room'])
            ->update(['id_status' => 2]);

        $data['checkIn'] = 'ok';

        return response()->json($data);
    }

    public function evictionFromRoom(Request $request)
    {
        //Нужно дорабртать базу данных, пока костыли
        $data = $request->all();

        DB::table('rooms')
            ->where('id', $data['id_room'])
            ->update(['id_status' => 1]);

        $data['checkIn'] = 'ok';

        return response()->json($data);
    }
}
