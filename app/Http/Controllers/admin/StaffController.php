<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StaffController extends Controller
{
    public function getStaff() {

       $staff =  DB::table('staff')->get();

       return response()->json($staff);
    }

    public function getEmployee($id) {
        $employee = DB::table('staff')
                     ->join('roles', 'staff.position', '=','roles.id')
                     ->where('staff.id', "=", $id)
                     ->first();

        return response()->json($employee);
    }

    public function editEmployee(Request $request, $id)
    {
        $data = $request->all();
        $employee = DB::table('staff')->find($id);

        if ($employee) {
            DB::table('staff')->where('id', $id)->update(['last_name' => $data['last_name'],
                'first_name' => $data['first_name'], 'phone' => $data['phone'], 'email' => $data['email'],
                'employment_date' => $data['employment_date']]);

            $updatedEmployee = DB::table('staff')->find($id);

            return response()->json($updatedEmployee);
        } else {
            return response()->json(['message' => 'Сотрудник не найден'], 404);
        }
    }

}
