<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Guests;
use App\Models\Rooms;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    public function getBooking()
    {

        $result = [];


        $allBookings = Booking::query()
            ->with('room')
            ->with('guest.user')
            ->with('employee.user')
            ->orderByDesc('id')
            ->get();

        foreach ($allBookings as $booking) {
            $result[] = [
                'booking_number' => $booking->id,
                'room_number' => $booking->room->number,
                'guest_name' => $booking->guest->user->first_name . ' ' . $booking->guest->user->last_name,
                'guest_phone' => $booking->guest->user->phone,
                'check_in' => $booking->check_in,
                'check_out' => $booking->check_out,
                'admin_name' => $booking->employee->user->first_name . ' ' . $booking->employee->last_name

            ];
        }


        return response()->json($result);
    }

    public function getNoCheckInBooking()
    {

        $result = [];

        $checkins = DB::table('check_in')->select(['id_booking'])->get();

        $allBookings = Booking::query()
            ->with('room')
            ->with('guest.user')
            ->with('employee.user')
            ->orderByDesc('id')
            ->get();

        foreach ($allBookings as $booking) {
            if (!$checkins->contains('id_booking', $booking->id))
                $result[] = [
                    'booking_number' => $booking->id,
                    'room_number' => $booking->room->number,
                    'guest_name' => $booking->guest->user->first_name . ' ' . $booking->guest->user->last_name,
                    'guest_phone' => $booking->guest->user->phone,
                    'check_in' => $booking->check_in,
                    'check_out' => $booking->check_out,
                    'admin_name' => $booking->employee->user->first_name . ' ' . $booking->employee->last_name

                ];
        }


        return response()->json($result);
    }

    public function getOneBooking($id)
    {
        $booking = Booking::where('id', $id)->with('guest.user')->get()->first();
        $result = [
            'booking_number' => $booking->id,
            'room_id' => $booking->id_room,
            'guest_firstname' => $booking->guest->user->first_name,
            'guest_lastname' => $booking->guest->user->last_name,
            'guest_phone' => $booking->guest->user->phone,
            'check_in' => $booking->check_in,
            'check_out' => $booking->check_out,
            'guest_id' => $booking->guest->id,
            'user_id' => $booking->guest->user->id,
        ];
        $room = Rooms::where('id', $booking->id_room)->with('category')->get()->first();
        $data = [

            'number' => $room->number,
            'price' => $room->price,
            'max_guests' => $room->max_guests,
            'category' => $room->category->category,
        ];
        $data_arrays = [
            'images' => json_decode($room->images, true),
            'comfort' => json_decode($room->comfort, true),
            'sets' => json_decode($room->sets, true),
        ];

        $result = [$result, $data, $data_arrays];
        return response()->json($result);
    }

    public function deleteBooking($id)
    {
        $data['delete'] = 'error';
        $booking = Booking::where('id', $id)->get()->first();
        if ($booking) {
            $guest_id = $booking->id_guest;
            $guest = Guests::where('id', $guest_id)->get()->first();
            if ($guest) {
                $user_id = $guest->id_user;
                $user = User::where('id', $user_id)->get()->first();
                if ($user) {
                    $user->delete();
                    $data['delete'] = 'OK';
                }
            }

            //dump($booking, $user, $guest);
        }
        return response()->json($data);
    }

    public function saveEditedBooking(Request $request)
    {
        $response = [];

        $data = $request->only([
            'id',
            'firstname',
            'lastname',
            'phone',
            'checkin_date',
            'checkout_date',
            'room_id',
            'guest_id',
            'user_id',
        ]);
        if (!empty($data)) {
            DB::table('booking')->where('id', $data['id'])->update([
                'id_room' => $data['room_id'],
                'check_in' => $data['checkin_date'],
                'check_out' => $data['checkout_date'],
            ]);

            $user = User::where('id', $data['user_id'])->get()->first();
            $user->first_name = $data['firstname'];
            $user->last_name = $data['lastname'];
            $user->phone = $data['phone'];
            $user->save();

            $response['saved'] = 'OK';
        }
        return response()->json($response);
    }
}
