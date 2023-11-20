<?php

namespace App\Http\Controllers\director;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

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


}
