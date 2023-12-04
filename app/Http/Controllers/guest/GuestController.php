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
        $comfort = json_decode($room->comfort);

        $bed = $comfort->bed;
        $conditioner = $comfort->conditioner;
        $roomsNumber = $comfort->roomsNumber;
        $toilet = $comfort->toilet;
        $shower = $comfort->shower;
        $wifi = $comfort->wifi;


        //получаем информацию о проживании
        $adults = $check_in->quantity_adults;
        $children = $check_in->quantity_children;
        $price = $room->price;
        $checkInObj = new DateTime($check_in->checkIn);
        $checkOutObj = new DateTime($check_in->checkOut);
        $checkIn = $checkInObj->format('d.m.Y');
        $checkOut = $checkOutObj->format('d.m.Y');
        //расчет общего количества дней проживания
        $checkIn_ts = strtotime($checkIn);
        $checkOut_ts = strtotime($checkOut);
        $days = (abs($checkIn_ts - $checkOut_ts))/86400;
        //считаем общую стоимость проживания
         $people = $maxGuests - ($adults + $children);
         $totalCost = 0;
        if($people >= 0){
            $totalCost = $price * $days;
        }else {
            $totalCost = $people * $additionalGuest + $price * $days;
        }

        $user->guestName = $first_name .' '. $last_name;
        $user->roomNumber = $roomNumber;
        $user->roomCategory = $roomCategory;
        $user->dates = $checkIn .' - '.$checkOut;
        $user->adults = $adults;
        $user->children = $children;
        $user->price = $price;
        $user->totalCost = $totalCost;
        $user->comfort = $comfort;
        $user->bed = $bed;
        $user->conditioner = $conditioner;
        $user->roomsNumber = $roomsNumber;
        $user->toilet = $toilet;
        $user->shower = $shower;
        $user->wifi = $wifi;

        return response()->json($user);
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

    public function setFeedback (){

    }

}
