<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpParser\Error;

class StaffController extends Controller
{
    public function getStaff() {

       $staff =  DB::table('staff')->get();

       return response()->json($staff);
    }

    public function getEmployee($id) {

        $result = [];
        $employee = DB::table('staff')
                     ->join('roles', 'staff.id_role', '=','roles.id')
                     ->where('staff.id', "=", $id)
                     ->first();

        $roles = DB::table('roles')->get();


        foreach ($roles as $role) {
            $result['roles'][$role->id] = $role->role;
        }

        $result['employee'] = [
            'id' => $employee->id,
            'first_name' => $employee->first_name,
            'last_name' => $employee->last_name,
            'phone' => $employee->phone,
            'email' => $employee->email,
            'passport' => $employee->passport,
            'employment_date' => $employee->employment_date,
            'role' => $employee->role,
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

        $role = DB::table('roles')
                  ->where('role' , '=', $data['role'])
                  ->first();

        DB::table('staff')->where('id', $id)->update([
                'last_name' => $data['last_name'],
                'first_name' => $data['first_name'],
                'phone' => $data['phone'],
                'email' => $data['email'],
                'employment_date' => $data['employment_date'],
                'id_role' => $role->id
            ]
        );

        $updatedEmployee = DB::table('staff')
                             ->join('roles', 'staff.id_role', '=','roles.id')
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
            'role' => $updatedEmployee->role,
        ]);
    }

}
