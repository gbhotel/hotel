<?php

namespace App\Http\Controllers\director;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\Cast\Object_;

class AnalysisController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     * Возвращает количество работающих сотрудников по должностям
     */
    public function getCountStaff()
    {
        $countStaff = DB::select('select p.name, count(p.name) from staff s join positions p on s.id_position = p.id where s.dismissed = false group by id_position, p.name order by s.id_position');

        $summ = DB::table('staff')->where('dismissed', '=', false)->count('id');

        $arr = [['name' => 'Всего', 'count' => $summ], ...$countStaff];

        return response()->json($arr);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     * Возвращает количество уволеных сотрудников по должностям
     */
    public function getCountStaffDismiss()
    {
        $countStaff = DB::select('select p.name, count(p.name) from staff s join positions p on s.id_position = p.id where s.dismissed = true group by id_position, p.name order by s.id_position');

        $summ = DB::table('staff')->where('dismissed', '=', true)->count('id');

        $arr = [['name' => 'Всего', 'count' => $summ], ...$countStaff];

        return response()->json($arr);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     * Возвращает количество комнат по статусам
     */
    public function getCountRooms(Request $request)
    {
        $date = $request->date;
        $today = $date;

        $allRooms['name'] = 'Все комнаты';
        $allRooms['count'] = DB::table('rooms')->select('id')->count('id');

        $checkInRooms['name'] = 'Занятые комнаты';
        $checkInRooms['count'] = DB::table('check_in')
            ->whereDate('checkIn', '<=', $today)
            ->whereDate('checkOut', '>=', $today)
            ->select('id')
            ->count('id');

        $bookingRooms['name'] = 'Забронированые комнаты';
        $bookingRooms['count'] = DB::table('booking')
            ->leftJoin('check_in', 'booking.id', '=', 'check_in.id_booking')
            ->where('check_in.id_booking', '=', null)
            ->whereDate('booking.check_in', '<=', $today)
            ->whereDate('booking.check_out', '>=', $today)
            ->select('id')
            ->count('booking.id');

        $closedRooms['name'] = 'Закрытые комнаты';
        $closedRooms['count'] = DB::table('rooms_closed')
            ->whereDate('closure_at', '<=', $today)
            ->whereDate('opening_at', '>=', $today)
            ->select('id')
            ->count('id');

        $freeRooms['name'] = 'Свободные комнаты';
        $freeRooms['count'] = $allRooms['count'] - $checkInRooms['count'] -  $bookingRooms['count'] - $closedRooms['count'];

        $quantityRooms = [$allRooms, $freeRooms, $checkInRooms, $bookingRooms, $closedRooms];

        return response()->json($quantityRooms);
    }

    public function getCountGuests(Request $request)
    {
        $date = $request->date;
        $today = $date;

        $quantityGuests = DB::table('check_in')
            ->leftJoin('booking', 'check_in.id_booking', '=', 'booking.id')
            ->leftJoin('rooms', 'booking.id_room', '=', 'rooms.id')
            ->whereDate('check_in.checkIn', '<=', $today)
            ->whereDate('check_in.checkOut', '>=', $today)
            ->select('rooms.number', 'check_in.quantity_adults', 'check_in.quantity_children')
            ->get();

        $sumAdults = 0;
        $sumChildren = 0;

        foreach ($quantityGuests as $room)
        {
            $sumAdults = $sumAdults + $room->quantity_adults;
            $sumChildren = $sumChildren + $room->quantity_children;

        }

        $sumGuests = $sumAdults + $sumChildren;

        $arrSumGuests = ['allGuests'=>$sumGuests, 'allAdults'=>$sumAdults, 'allChildren'=>$sumChildren];



        return response()->json([[$arrSumGuests], $quantityGuests]);
    }


}
