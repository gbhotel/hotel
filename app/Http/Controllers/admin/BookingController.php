<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Guests;
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
}
