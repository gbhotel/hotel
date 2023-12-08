<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Check_in;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CheckInController extends Controller
{

    public function checkIn(Request $request)
    {
        $booking_number = $request['checkInBookingNumber'];
        $adults = $request['adults'];
        $children = $request['children'];
        $checkInTime = $request['checkInTime'];
        $responce['status'] = 'error';

        $booking = DB::table('booking')->where('id', $booking_number)->get()->first();
        if ($booking) {
            DB::table('check_in')->insert([
                'id_admin' => Auth::user()->id,
                'id_booking' => $booking_number,
                'checkIn' => $booking->check_in . ' ' . $checkInTime,
                'checkOut' => $booking->check_out . ' 12:00:00',
                'actualCheckOut' => '',
                'quantity_adults' => $adults,
                'quantity_children' => $children,
            ]);
            $responce['status'] = 'OK';
        }
        return response()->json($responce);
    }

    public function checkOut(Request $request)
    {
        $responce['status'] = 'error';

        if (isset($request['id']) && isset($request['checkOutDate']) && isset($request['checkOutTime'])) {
            $dateTime = $request['checkOutDate'] . ' ' . $request['checkOutTime'];
            DB::table('check_in')
                ->where('id', $request['id'])
                ->update(['actualCheckOut' => $dateTime]);
            if ($request['updateBooking']) {
                $checkIn = DB::table('check_in')
                    ->where('id', $request['id'])->get()->first();
                $booking = DB::table('booking')->where('id', $checkIn->id_booking)->update(['check_out' => $request['checkOutDate']]);
            }
            $responce['status'] = 'OK';
        }
        return response()->json($responce);
    }

    public function getCheckIns($date)
    {
        $result = [];
        $dateTimeCheckIn = $date . ' 23:59:59';
        $dateTimeCheckOut = $date . ' 00:00:00';
        $s = '';
        $checkIns = Check_in::query()
            ->with('booking.guest.user')
            ->with('booking.room')
            // ->where('checkIn', '<=', $dateTimeCheckIn)
            // ->where('checkOut', '>=', $dateTimeCheckOut)
            ->where('actualCheckOut', '')
            ->get();

        foreach ($checkIns as $checkIn) {
            $result[] = [
                'id' => $checkIn->id,
                'roomNumber' => $checkIn->booking->room->number,
                'bookingId' => $checkIn->id_booking,
                'checkIn' => $checkIn->checkIn,
                'checkOut' => $checkIn->checkOut,
                'adults' => $checkIn->quantity_adults,
                'children' => $checkIn->quantity_children,
                'name' => $checkIn->booking->guest->user->last_name . ' ' . $checkIn->booking->guest->user->first_name,
                'phone' => $checkIn->booking->guest->user->phone,
            ];
        }
        usort($result, function ($a, $b) {
            return ($a['roomNumber'] - $b['roomNumber']);
        });
        return response()->json($result);
    }
}
