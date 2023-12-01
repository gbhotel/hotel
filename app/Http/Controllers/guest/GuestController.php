<?php

namespace App\Http\Controllers\guest;

use App\Http\Controllers\Controller;
use App\Models\Guest_requests;
use DateTime;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;

class GuestController extends Controller
{
    public  function getRequests()
    {
       $guestRequests =  DB::table('guest_requests')
            ->get();

       return response()->json($guestRequests);
    }

    public function getInfoAboutGuestRoom(): \Illuminate\Http\JsonResponse
    {
        $user = Auth::user();//пользователь который залогинен
        $guest = DB::table('guests')->where('id_user', '=', $user->id)->first('*');
        $booking = DB::table('booking')->where('id_guest', '=', $guest->id)->first('*');
        $room = DB::table('rooms')->where('id', '=', $booking->id_room)->first('*');
        $category = DB::table('categories')->where('id', '=', $room->id_category)->first('category');
        $check_in = DB::table('check_in')->where('id_booking', '=', $booking->id)->first('*');

        //получаем имя и фамилию гостя
        $first_name = $user->first_name;
        $last_name = $user->last_name;

        //получаем информацию о комнате
        $roomNumber = $room->number;
        $roomCategory = $category->category;
        $maxGuests = $room->max_guests;
        $additionalGuest = $room->additional_guest;
        $comfort = $room->comfort;
        $sets = $room->sets;

        //получаем информацию о проживании
//         $checkIn = $check_in->checkIn;
//         $checkOut = $check_in->checkOut;
         $adults = $check_in->quantity_adults;
         $children = $check_in->quantity_children;
         $price = $room->price;


         //считаем общую стоимость проживания
//         $b = $checkOut->diff(new DateTime)->format('%d');
//         $a = $checkIn->diff(new DateTime)->format('%d');
//         $days = $b - $a;
//         $c = $maxGuests - ($adults + $children);
//         $totalCost = 0;
//        if($c >= 0){
//            $totalCost = $price * $days;
//        }else {
//            $totalCost = $c * $additionalGuest + $price * $days;
//        }
        $checkIn = new DateTime($check_in->checkIn);
        $checkOut = new DateTime($check_in->checkOut);
        $age = $checkOut->diff($checkIn)->format('%day');
        $check_in = $checkIn->format('d.m.Y');
        $check_out = $checkOut->format('d.m.Y');

        $user->guestName = $first_name .' '. $last_name;
        $user->roomId = $room->id;
        $user->roomNumber = $roomNumber;
        $user->roomCategory = $roomCategory;
        $user->dates = $check_in .' - '.$check_out;
        $user->adults = $adults;
        $user->children = $children;
        $user->price = $price;
//        $user->totalCost = $totalCost;
        $user->age = $age;

        return response()->json($user);
//        return response()->json('привет');
    }

    public function setRequests(Request $request){

        $date = new Date();

//        $request = DB::table('guest_requests')->get();

        $response = Guest_requests::query()->insert([
            'name'=>$request->name,
            'id_room'=>$request->roomId,
            'id_guest'=>$request->guestId,
            'comment'=>$request->comment,
            'created_date' => now(),
        ]);

        if($response){
            return response()->json(['message' => 'Заявка принята!']);
        }

        return response()->json(['message' => 'Произошла ошибка, заявка не отправлена(']);

    }

}
