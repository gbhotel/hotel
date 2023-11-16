<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    protected $accessFor = ['директор'];

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
                'guest_name' => $booking->guest->user->first_name . ' ' . $booking->guest->last_name,
                'guest_phone' => $booking->guest->user->phone,
                'check_in' => $booking->check_in,
                'check_out' => $booking->check_out,
                'admin_name' => $booking->employee->user->first_name . ' ' . $booking->employee->last_name

            ];
        }


        return response()->json($result);
    }
}
