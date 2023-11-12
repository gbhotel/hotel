<?php

namespace App\Http\Controllers\director;

use App\Http\Controllers\Controller;
use App\Models\Positions;
use App\Models\Role;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class StaffController extends Controller
{
    public function getStaff() {

        $result = [];

        $staff =  Staff::query()
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

    public function getEmployee($id) {

        $employee = Staff::query()
            ->with('user')
            ->with('position')
            ->find($id);

        $role = Role::query()->find($employee->user->role_id);

        $user = $employee->user;
        $position = $employee->position->name;

        $employee->userId = $user->id;
        $employee->firstName = $user->first_name;
        $employee->lastName = $user->last_name;
        $employee->username = $user->username;
        $employee->email = $user->email;
        $employee->phone = $user->phone;
        $employee->passport = $user->passport;
        $employee->role = $role->name;
        $employee->emailVerifiedAt = $user->email_verified_at;
        $employee->createdAt = $user->created_at;
        $employee->updatedAt = $user->updated_at;
        unset($employee->position);
        $employee->position = $position;
        unset($employee->user);
        unset($employee->id_position);

        return response()->json($employee);
    }

    public function getAllPositions()
    {
        $position = Positions::query()->get();
        return response()->json($position);
    }
    public function getAllRoles()
    {
        $position = Role::query()->get();
        return response()->json($position);
    }

    public function createEmployee(Request $request)
    {
        $person = $request->all();

        $data = [];
        $data['username'] = DB::table('users')->select('username')->where('username', '=', $person['username'])->exists();
        $data['passport'] = DB::table('users')->select('passport')->where('passport', '=', $person['passport'])->exists();
        $data['email'] = DB::table('users')->select('email')->where('email', '=', $person['email'])->exists();
        $data['phone'] = DB::table('users')->select('phone')->where('phone', '=', $person['phone'])->exists();

        if($data['username'] || $data['passport'] || $data['email'] || $data['phone'] ){
            $data['validation'] = 'bad';
            return response()->json($data);
        }

        $employee = ['id_position' => $person['position'], 'employment_date' => $person['employmentDate']];

        unset($person['position']);
        unset($person['employmentDate']);

        $pass = Hash::make($person['password']);
        $person['password'] = $pass;

        try{
            $id = DB::table('users')->insertGetId([...$person]);

            $employee['id_user'] = $id;

            DB::table('staff')->insert([...$employee]);
        }catch (\Exception $e){

            $data['saveUser'] = 'bad';
            $data['error'] = $e->getMessage();

            return response()->json($data);
        }

        $data['validation'] = 'good';
        $data['saveUser'] = 'good';

        return response()->json($data);
    }
}
