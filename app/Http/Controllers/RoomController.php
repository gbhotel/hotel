<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoomController extends Controller
{

    public function getRoom($id)
    {
        $date = now()->toDateTimeString();

        $data = DB::table('check_in')
            ->join('booking', 'check_in.id_booking', '=', 'booking.id')
            ->join('rooms', 'booking.id_room', '=', 'rooms.id')
            ->join('categories', 'rooms.id_category', '=', 'categories.id')
            ->join('staff', 'check_in.id_admin', '=', 'staff.id')
            ->join('roles', 'staff.id_role', '=', 'roles.id')
            ->join('staff as staff2', 'booking.id_admin', '=', 'staff2.id')
            ->join('roles as roles2', 'staff2.id_role', '=', 'roles2.id')

            ->where('booking.id_room', '=', $id)
            ->whereDate( 'check_in.checkIn', '<',$date)
            ->whereDate('check_in.checkOut', '>', $date)

            ->select(
                // О комнате
                'rooms.id as roomId', 'rooms.number as roomNumber',
                'rooms.comfort as roomComfort', 'categories.category',
                //о бронировании
                'booking.id as bookingId', 'booking.check_in as bookingCheckIn', 'booking.check_out as bookingCheckOut',
                //сотрудник который забронировал
                'staff2.id as staffIdB', 'staff2.first_name as staffFirstNameB', 'staff2.last_name as staffLastNameB',
                'staff2.phone as staffPhoneB', 'staff2.email as staffEmailB', 'staff2.passport as staffPassportB',
                'staff2.employment_date as staffEmploymentDateB','roles2.role as staffRoleB',
                // о заселении
                'check_in.id as checkId', 'check_in.checkIn as checkCheckIn', 'check_in.checkOut as checkCheckOut',
                //сотрудник, который заселял
                'staff.id as staffIdCh', 'staff.first_name as staffFirstNameCh', 'staff.last_name as staffLastNameCh',
                'staff.phone as staffPhoneCh', 'staff.email as staffEmailCh', 'staff.passport as staffPassportCh',
                'staff.employment_date as staffEmploymentDateCh', 'roles.role as staffRoleCh',

            )
            ->get();

        if(!empty($data[0])){
            $data[0]->status = 'check_in';
        }else{
            $data = DB::table('booking')
                ->join('rooms', 'booking.id_room', '=', 'rooms.id')
                ->join('categories', 'rooms.id_category', '=', 'categories.id')
                ->join('staff as staff2', 'booking.id_admin', '=', 'staff2.id')
                ->join('roles as roles2', 'staff2.id_role', '=', 'roles2.id')

                ->where('id_room', '=', $id)
                ->whereDate( 'check_in', '<',$date)
                ->whereDate('check_out', '>', $date)

                ->select(
                    //О комнате
                    'rooms.id as roomId', 'rooms.number as roomNumber',
                    'rooms.comfort as roomComfort', 'categories.category',
                    //о бронировании
                    'booking.id as bookingId', 'booking.check_in as bookingCheckIn',
                    'booking.check_out as bookingCheckOut',
                    //сотрудник который забронировал
                    'staff2.id as staffIdB', 'staff2.first_name as staffFirstNameB', 'staff2.last_name as staffLastNameB',
                    'staff2.phone as staffPhoneB', 'staff2.email as staffEmailB', 'staff2.passport as staffPassportB',
                    'staff2.employment_date as staffEmploymentDateB','roles2.role as staffRoleB'
                )
                ->get();

            if(!empty($data[0])){
                $data[0]->status = 'booking';
            }else{
                $data = DB::table('rooms')
                    ->join('categories', 'rooms.id_category', '=', 'categories.id')
                    ->where('rooms.id', '=', $id)
                    ->select(
                        'rooms.id as roomId', 'rooms.number as roomNumber',
                        'rooms.comfort as roomComfort', 'categories.category',
                    )
                    ->get();

                $data[0]->status = 'free';
            }
        }

        $comfort = json_decode($data[0]->roomComfort);

        $data[0]->wifi = $comfort->wifi;
        $data[0]->bed = $comfort->bed;
        $data[0]->toilet = $comfort->toilet;
        $data[0]->shower = $comfort->shower;
        $data[0]->roomsNumber = $comfort->roomsNumber;
        $data[0]->conditioner = $comfort->conditioner;

        unset($data[0]->roomComfort);

        return response()->json($data);
    }

    public function bookRoom(Request $request)
    {
        $response =[];

        $data = $request->only([
            'first_name',
            'last_name',
            'phone',
            'id_room',
            'checkinDate',
            'checkoutDate',
        ]);

        if (!empty($data)) {
            $newGuestId  = DB::table('guests')
              ->insertGetId ([
                  'first_name' => $data['first_name'],
                  'last_name' => $data['last_name'],
                  'phone' => $data['phone'],
              ]);

            $newBooking = DB::table('booking')
              ->insertGetId ([
                  'id_guest' => $newGuestId,
                  'id_room' => $data['id_room'],
                  'check_in' => date($data['checkinDate']),
                  'check_out' => date($data['checkoutDate']),
                  'id_admin' => 1
              ]);

            $response['bookingId'] = $newBooking;
        }

        return response()->json($response);
    }

    public function cancelBookRoom(Request $request)
    {
        //Нужно дорабртать базу данных, пока костыли
        $data = $request->all();

        DB::table('rooms')
            ->where('id', $data['id_room'])
            ->update(['id_status' => 1]);

        $data['free'] = 'ok';

        return response()->json($data);
    }

    public function checkInRoom(Request $request)
    {
        //Нужно дорабртать базу данных, пока костыли
        $data = $request->all();

        DB::table('rooms')
            ->where('id', $data['id_room'])
            ->update(['id_status' => 2]);

        $data['checkIn'] = 'ok';

        return response()->json($data);
    }

    public function evictionFromRoom(Request $request)
    {
        //Нужно дорабртать базу данных, пока костыли
        $data = $request->all();

        DB::table('rooms')
            ->where('id', $data['id_room'])
            ->update(['id_status' => 1]);

        $data['checkIn'] = 'ok';

        return response()->json($data);
    }
}
