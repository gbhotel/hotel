<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpParser\Error;

class StaffController extends Controller
{
    protected $accessFor = ['директор'];
    public function getStaff()
    {

        $result = [];


        $staff =  Staff::query()
            ->where('dismissed', '=', 0)
            ->with('position')
            ->with('user')
            ->orderByDesc('id')
            ->get();

        foreach ($staff as $employee) {
            $result[] = [
                'id' => $employee->id,
                'first_name' => $employee->user->first_name,
                'last_name' => $employee->user->last_name,
                'phone' => $employee->user->phone,
                'email' => $employee->user->email,
                'passport' => $employee->user->passport,
                'employment_date' => $employee->employment_date,
                'position' => $employee->position->name,
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
}
