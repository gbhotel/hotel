<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use App\Models\Staff;
use DateInterval;
use \DateTime;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StaffController extends Controller
{
    protected $accessFor = ['директор', 'администратор'];

    /**
     * @throws \Exception
     */
    public function getStaff()
    {

        $result = [];

        $staff=  Staff::query()
            ->where('dismissed', '=', 0)
            ->with('position')
            ->whereNot('id_position', '=', 1)
            ->with('user')
            ->get();

        $today = new DateTime();
        $tomorrow = (clone $today)->add(new DateInterval("PT24H"));
        $yesterday = (clone $today)->sub(new DateInterval("PT24H"));

        //Определяем статус
        foreach ($staff as $key => $item)
        {
            $working = DB::table('working_hours')
                ->where('id_staff', '=', $item->id)
                ->where(function (Builder $query) use ($tomorrow, $today, $yesterday) {
                    $query->whereDate('beginning', '=', $yesterday)
                        ->orWhereDate('beginning', '=', $today)
                        ->orWhereDate('beginning', '=', $tomorrow);
                })
                ->select('id_staff', 'beginning', 'end', 'work_in', 'work_out')
                ->first();

            $todayStr = $today->format('Y-m-d H:i:s');
            $todayDateStr = $today->format('Y-m-d');
            $todayTimeStr = $today->format('H:i:s');

            $beginning = new DateTime($working->beginning);
            $beginningDateStr = $beginning->format('Y-m-d');
            $beginningTimeStr = $beginning->format('H:i:s');

            $end = new DateTime($working->end);
            $endDateStr = $end->format('Y-m-d');
            $endTimeStr = $end->format('H:i:s');

            if($beginningDateStr == $todayDateStr && $endDateStr == $todayDateStr && $beginningTimeStr >= $todayTimeStr){
                $staff[$key]->status = 'Начнется';
            }elseif($beginningDateStr == $todayDateStr && $endDateStr == $todayDateStr && $endTimeStr >= $todayTimeStr){
                $staff[$key]->status = 'Закончилась';
            }elseif($beginningDateStr == $todayDateStr && $endDateStr == $todayDateStr && $beginningTimeStr <= $todayTimeStr && $endTimeStr >= $todayTimeStr){
                $staff[$key]->status = 'Смена';

            }elseif($beginningDateStr == $todayDateStr && $endDateStr > $todayDateStr && $beginningTimeStr >= $todayTimeStr){
                $staff[$key]->status = 'Начнется';
            }elseif($beginningDateStr <= $todayDateStr && $endDateStr == $todayDateStr && $endTimeStr >= $todayTimeStr){
                $staff[$key]->status = 'Закончилась';
            }elseif($beginningDateStr == $todayDateStr && $endDateStr >= $todayDateStr && $beginningTimeStr <= $todayTimeStr){
                $staff[$key]->status = 'Смена';
            }elseif($beginningDateStr <= $todayDateStr && $endDateStr == $todayDateStr && $endTimeStr >= $todayTimeStr){
                $staff[$key]->status = 'Смена';
            }else{
                $staff[$key]->status = 'Отдых';
            }



//            if($todayStr >= $working->beginning && $todayStr <= $working->end)
//            {
//                $staff[$key]->status = 'Смена';
//
//            }else{
//                $staff[$key]->status = 'Oтдых';
//            }
//
//            if($working->work_in == null && $working->work_out == null)
//            {
//                $working->fact = 'Еще не пришёл';
//            }
//            elseif($working->work_in != null && $working->work_out == null) {
//                $working->fact = 'На смене';
//            }
//            elseif($working->work_in != null && $working->work_out != null) {
//                $working->fact = 'Уже ушёл';
//            }
//            else{
//                $working->fact = 'Сбой';
//            }

            $working->fact = '???';

            $staff[$key]->working = $working;
        }

        foreach ($staff as $employee) {
            $result[] = [
                'id' => $employee->id,
                'first_name' => $employee->user->first_name,
                'last_name' => $employee->user->last_name,
                'full_name' => $employee->user->first_name . ' ' . $employee->user->last_name,
                'phone' => $employee->user->phone,
                'email' => $employee->user->email,
                'passport' => $employee->user->passport,
                'employment_date' => $employee->employment_date,
                'position' => $employee->position->name,
                'status' => $employee->status,
                'birthday' => $employee->user->birthday,
                'gender' =>  $employee->user->gender,
                'photo' => $employee->user->photo,
                'username' => $employee->user->username,
                'statusFact' => $employee->working->fact,
                'working' => $employee->working,
            ];
        }
        return response()->json($result);

    }

    public function getEmployee($id)
    {
        $result = [];

        $employee = Staff::query()
            ->with('user')
            ->with('position')
            ->find($id);

        $positions = DB::table('positions')->get();

        foreach ($positions as $position) {
            $result['positions'][$position->id] = $position->name;
        }

        $result['employee'] = [
            'id' => $employee->id,
            'id_user' => $employee->user->id,
            'first_name' => $employee->user->first_name,
            'last_name' => $employee->user->last_name,
            'phone' => $employee->user->phone,
            'email' => $employee->user->email,
            'passport' => $employee->user->passport,
            'employment_date' => $employee->employment_date,
            'position' => $employee->position->name,
        ];

        return response()->json($result);
    }

    public function editEmployee(Request $request, $id)
    {
        $employee = DB::table('staff')->find($id);

        if (!$employee) {
            return response()->json(['message' => 'Сотрудник не найден'], 404);
        }

        $data = $request->all();

        $position = DB::table('positions')
            ->where('name', '=', $data['position'])
            ->first();

        DB::table('users')->where('id', '=', $data['id_user'])->update(
            [
                'last_name' => $data['last_name'],
                'first_name' => $data['first_name'],
                'phone' => $data['phone'],
                'email' => $data['email']
            ]
        );

        DB::table('staff')->where('id', $id)->update(
            [
                'id_position' => $position->id,
                'employment_date' => $data['employment_date'],

            ]
        );

        $updatedEmployee = DB::table('staff')
            ->join('positions', 'staff.id_position', '=', 'positions.id')
            ->join('users', 'staff.id_user', '=', 'users.id')
            ->where('staff.id', "=", $id)
            ->first();

        return response()->json([
            'id' => $updatedEmployee->id,
            'first_name' => $updatedEmployee->first_name,
            'last_name' => $updatedEmployee->last_name,
            'phone' => $updatedEmployee->phone,
            'email' => $updatedEmployee->email,
            'passport' => $updatedEmployee->passport,
            'employment_date' => $updatedEmployee->employment_date,
            'position' => $updatedEmployee->name,
        ]);
    }

    function setWorkingInEmployee(Request $request): \Illuminate\Http\JsonResponse
    {
        $admin = Auth::user();
        $id_admin1 = $admin->id;
        $data = $request->all();
        unset($data['_token']);

        if($data['id_staff'] === $id_admin1){
            $data['answer'] = false;
            $data['auth'] = false;
            $data['message'] = 'Нельзя отметить время прихода на работу самому себе. Это должен сделать сотрудник, у которого вы приняли смену';

            return response()->json($data);
        }
        $data['auth'] = true;

        $work_in = $data['work_in'];

        try {
            $count = DB::table('working_hours')
                ->where('id_staff', '=', $data['id_staff'])
                ->where('beginning', '=', $data['beginning'])
                ->update(['work_in' =>  $work_in, 'id_admin1' => $id_admin1]);

            if($count == 1){
                $data['count'] = $count;
                $data['answer'] = true;
                $data['db'] = true;
                $data['message'] = 'Время прихода на работу успешно отмечено.';
                return response()->json($data);
            }else if ($count == 0){
                $data['message'] = 'В базе данных не завиксировано изменений.';
            }else{
                $data['message'] = 'Непредусмотренная ошибка работы с базой данных';
            }
        }catch (\Exception $e){
            $data['message'] = $e->getMessage();
        }

        $data['answer'] = false;
        $data['db'] = false;

        return response()->json($data);
    }

    function setWorkingOutEmployee(Request $request): \Illuminate\Http\JsonResponse
    {
        try {

            $admin = Auth::user();
            $id_admin2 = $admin->id;
            $data = $request->all();
            unset($data['_token']);

            if ($data['id_staff'] === $id_admin2) {
                $data['answer'] = false;
                $data['auth'] = false;
                $data['message'] = 'Нельзя отметить время ухода с работы самому себе. Это должен сделать сотрудник, которому сдаете смену';

                return response()->json($data);
            }
            $data['auth'] = true;
//            return response()->json($data['work_in']);
            $work_in = $data['work_in'];

            try {
                $count = DB::table('working_hours')
                    ->where('id_staff', '=', $data['id_staff'])
                    ->where('beginning', '=', $data['beginning'])
                    ->update(['work_out' => $work_in, 'id_admin2' => $id_admin2]);

                if ($count == 1) {
                    $data['count'] = $count;
                    $data['answer'] = true;
                    $data['db'] = true;
                    $data['message'] = 'Время прихода на работу успешно отмечено.';
                    return response()->json($data);
                } else if ($count == 0) {
                    $data['message'] = 'В базе данных не завиксировано изменений.';
                } else {
                    $data['message'] = 'Непредусмотренная ошибка работы с базой данных';
                }
            } catch (\Exception $e) {
                $data['message'] = $e->getMessage();
            }

            $data['answer'] = false;
            $data['db'] = false;

            return response()->json($data);
        }catch (\Exception $e){
            $data['e'] = $e->getMessage();
            return response()->json($data);
        }
    }
}
