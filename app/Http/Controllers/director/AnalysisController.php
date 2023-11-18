<?php

namespace App\Http\Controllers\director;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use function Laravel\Prompts\select;

class AnalysisController extends Controller
{
    public function getToken()
    {
        return response()->json(csrf_token());
    }
    public function getCountStaff()
    {
        $countStaff = DB::select('select p.name, count(p.name) from staff s join positions p on s.id_position = p.id where s.dismissed = false group by id_position, p.name order by s.id_position');

        $summ = DB::table('staff')->where('dismissed', '=', false)->count('id');

        $arr = [['name' => 'Всего', 'count' => $summ], ...$countStaff];

        return response()->json($arr);
    }

    public function getCountStaffDismiss()
    {
        $countStaff = DB::select('select p.name, count(p.name) from staff s join positions p on s.id_position = p.id where s.dismissed = true group by id_position, p.name order by s.id_position');

        $summ = DB::table('staff')->where('dismissed', '=', true)->count('id');

        $arr = [['name' => 'Всего', 'count' => $summ], ...$countStaff];

        return response()->json($arr);
    }

    public function getCountRooms()
    {
        return response()->json('Привет! Метод еще не готов');
    }
}
