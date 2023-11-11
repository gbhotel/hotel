<?php

namespace App\Http\Controllers;

use App\Models\Rooms;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoomsController extends Controller
{
    public function getRooms ()
    {
        $date = now()->toDateTimeString();

        $checkIn = DB::table('rooms')
            ->leftJoin('booking', 'rooms.id', '=', 'booking.id_room')
            ->leftjoin('check_in', 'booking.id', '=', 'check_in.id_booking')
            ->whereDate('booking.check_in', '<=', $date)
            ->whereDate('booking.check_out', '>=', $date)
            ->where( 'check_in.id_booking', '>', 0)
            ->select('rooms.id', 'rooms.number')
            ->get();

        foreach ($checkIn as $item) {
            $item->status = 'checkIn';
        }

        $booking = DB::table('rooms')
            ->leftJoin('booking', 'rooms.id', '=', 'booking.id_room')
            ->leftjoin('check_in', 'booking.id', '=', 'check_in.id_booking')
            ->whereDate('booking.check_in', '<=', $date)
            ->whereDate('booking.check_out', '>=', $date)
            ->whereNull( 'check_in.id_booking')
            ->select('rooms.id', 'rooms.number')
            ->get();

        foreach ($booking as $item) {
            $item->status = 'booking';
        }

        $free = DB::table('rooms')
            ->join( 'booking', 'rooms.id', '=', 'booking.id_room')
            ->whereDate('booking.check_out', '<=', $date)
            ->orWhereDate('booking.check_in', '>=', $date)
            ->orderBy('rooms.number')
            ->select('rooms.id', 'rooms.number')
            ->distinct('rooms.number')
            ->get();

        foreach ($free as $item) {
            $item->status = 'free';
        }

        $data = [...$free, ...$checkIn, ...$booking, ];

        return response()->json($data);
    }

    public function getFreeRoomsPeriod(Request $request)
    {
        $dateIn = $request['checkinDate'];
        $dateOut = $request['checkoutDate'];

        $freeRooms = [];

        $data = DB::table('rooms')
            ->join( 'booking', 'rooms.id', '=', 'booking.id_room')
            ->join( 'categories', 'rooms.id_category', '=', 'categories.id')
            ->whereDate('booking.check_out', '<', $dateIn)
            ->orWhereDate('booking.check_in', '>', $dateOut)
            ->orderBy('rooms.number')
            ->distinct('rooms.number')
            ->get();

        foreach ($data as $oneData) {
            $freeRooms[] = [
                'id' => $oneData->id_room,
                'number' => $oneData->number,
                'category' => $oneData->category,
                'comfort' => $oneData->comfort
            ];
        }
        return response()->json($freeRooms);
    }
}
