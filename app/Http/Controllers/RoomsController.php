<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Rooms;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoomsController extends Controller
{
    public function getRooms ()
    {
        $date = now()->toDateTimeString();

        $closed = DB::table('rooms_closed')
            ->leftJoin('rooms', 'rooms_closed.id_rooms', '=', 'rooms.id')
            ->whereDate('rooms_closed.closure_at', '<=', $date)
            ->whereDate('rooms_closed.opening_at', '>=', $date)
            ->select('rooms.id', 'rooms.number')
            ->get();

        foreach ($closed as $item) {
            $item->status = 'closed';
        }

        $checkIn = DB::table('rooms')
            ->leftJoin('booking', 'rooms.id', '=', 'booking.id_room')
            ->leftjoin('check_in', 'booking.id', '=', 'check_in.id_booking')
            ->whereDate('booking.check_in', '<=', $date)
            ->whereDate('booking.check_out', '>=', $date)
            ->where( 'check_in.id_booking', '>', 0)
            ->select('rooms.id', 'rooms.number', 'checkIn', 'checkOut')
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
            ->select('rooms.id', 'rooms.number',  'check_in', 'check_out')
            ->get();

        foreach ($booking as $item) {
            $item->status = 'booking';
        }

//        $notFree = DB::table('booking')
//            ->whereDate('check_out', '>', $date)
//            ->whereDate('check_in', '<', $date)
//            ->join('rooms', 'booking.id_room', '=', 'rooms.id')
//            ->select('rooms.id', 'rooms.number')
//            ->distinct('rooms.id')
//            ->get();

        $notFree = [...$closed, ...$checkIn, ...$booking];

        $allRooms = DB::table('rooms')->select('id', 'number')->get();

        $free =[];
        foreach ($allRooms as $key => $room)
        {
            $b = false;
            foreach ($notFree as $id)
            {
                if($id->id == $room->id){
                    $b = true;
                    break;
                }
            }
            if(!$b){
                $free[] = $room;
            }
        }

        foreach ($free as $item) {
            $item->status = 'free';
        }

        $data = [...$free, ...$checkIn, ...$booking, ...$closed ];

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

    public function getRoomsForCleaning() {

        $date = '2023-11-12';

        $roomsForCleaning = DB::table('rooms')
                              ->leftJoin('tasks', 'rooms.id', '=', 'tasks.id_room')
                              ->leftJoin('booking', 'rooms.id', '=', 'booking.id_room')
                              ->leftJoin('check_in', 'booking.id','=','check_in.id_booking')
                              ->where('tasks.name', '=', 'уборка номера')
                              ->whereDate('check_in.checkOut', '>=', $date)
                              ->groupBy('tasks.id_room')
                              ->havingRaw('MAX(tasks.execution_date) <= ?', [now()->subDays(3)])
                              ->selectRaw('tasks.id_room, MAX(tasks.execution_date) as max_execution_date')
                              ->get();

        return response()->json($roomsForCleaning);
    }


}
