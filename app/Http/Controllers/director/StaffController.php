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
    public function getEmployee($id) {

        $employee = Staff::query()
            ->with('user')
            ->with('position')
            ->find($id);

        $role = Role::query()->find($employee->user->role_id);

        $user = $employee->user;
        $position = $employee->position->name;
        $positionId = $employee->position->id;

        $createdAtDate = date("Y-m-d", strtotime($user->created_at));
        $updatedAtDate = date("Y-m-d", strtotime($user->updatedAt));

        $employee->userId = $user->id;
        $employee->firstName = $user->first_name;
        $employee->lastName = $user->last_name;
        $employee->username = $user->username;
        $employee->email = $user->email;
        $employee->phone = $user->phone;
        $employee->passport = $user->passport;
        $employee->role = $role->name;
        $employee->roleId = $role->id;
        $employee->emailVerifiedAt = $user->email_verified_at;
        $employee->createdAt = $createdAtDate;
        $employee->updatedAt = $updatedAtDate;
        $employee->photo = $user->photo;
        unset($employee->position);
        $employee->position = $position;
        $employee->positionId = $positionId;
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
        unset($person['_token']);

        $data = [];
        $data['username'] = DB::table('users')
            ->select('username')
            ->where('username', '=', $person['username'])
            ->exists();

        $data['passport'] = DB::table('users')
            ->select('passport')
            ->where('passport', '=', $person['passport'])
            ->exists();

        $data['email'] = DB::table('users')
            ->select('email')
            ->where('email', '=', $person['email'])
            ->exists();

        $data['phone'] = DB::table('users')
            ->select('phone')
            ->where('phone', '=', $person['phone'])
            ->exists();

        if($data['username'] || $data['passport'] || $data['email'] || $data['phone'] ){
            $data['validation'] = 'bad';
            return response()->json($data);
        }

        $employee = ['id_position' => $person['position'], 'employment_date' => $person['employmentDate'], 'dismissed' => false];

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
    public function editEmployee(Request $request)
    {
        $person = $request->all();

        $data = [];
        $data['username'] = DB::table('users')
            ->select('username')
            ->where('username', '=', $person['username'])
            ->whereNot('id', '=', $person['userId'])
            ->exists();
        $data['passport'] = DB::table('users')
            ->select('passport')
            ->where('passport', '=', $person['passport'])
            ->whereNot('id', '=', $person['userId'])
            ->exists();
        $data['email'] = DB::table('users')
            ->select('email')
            ->where('email', '=', $person['email'])
            ->whereNot('id', '=', $person['userId'])
            ->exists();
        $data['phone'] = DB::table('users')
            ->select('phone')
            ->where('phone', '=', $person['phone'])
            ->whereNot('id', '=', $person['userId'])
            ->exists();

        if($data['username'] || $data['passport'] || $data['email'] || $data['phone'] ){
            $data['validation'] = 'bad';
            return response()->json($data);
        }

        $employee = ['id_position' => $person['position'], /*'updated_at' => $person['updated_at']*/];

        $staffId = $person['staffId'];
        $userId = $person['userId'];

        unset($person['position']);
        unset($person['_token']);
        unset($person['staffId']);
        unset($person['userId']);

        try{
            $upUser = DB::table('users')->where('id', $userId)->update([...$person]);

            $upStaff = DB::table('staff')->where('id', $staffId)->update([...$employee]);

        }catch (\Exception $e){

            $data['saveUser'] = 'bad';
            $data['error'] = $e->getMessage();

            return response()->json($data);
        }

        $data['validation'] = 'good';
        $data['updataUser'] = 'good';
        $data['updataUserStr'] = $upUser;
        $data['updataStaffStr'] = $upStaff;

        return response()->json($data);
    }

    public function dismissUser(Request $request)
    {
        $date = now()->toDateTimeString();
        $data = $request->all();

        $staff = Staff::query()->with('user')->find($data['id']);

        $answer = [];
        $answer['staffId'] = $staff->id;

        try{
            DB::table('staff')->where('id', '=', $staff->id)->update(['dismissal_date' => $date, 'dismissed' => 1]);
        }catch (\Exception $e){
            $answer['dismissed'] = 'bad';
            $answer['error'] = $e->getMessage();

            return response()->json($answer);
        }

        $answer['dismissed'] = 'good';
        $answer['error'] = null;

        return response()->json($answer);
    }
}
