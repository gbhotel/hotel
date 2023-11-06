<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoomController extends Controller
{
    public function getRoom($id)
    {
        $room = DB::table('rooms')->find($id);
        $comfort = json_decode($room->comfort);

        $room->wifi = $comfort->wifi;
        $room->bed = $comfort->bed;
        $room->toilet = $comfort->toilet;
        $room->shower = $comfort->shower;
        $room->roomsNumber = $comfort->roomsNumber;
        unset($room->comfort);

        return response()->json($room);
    }

    public function bookRoom(Request $request)
    {
        //Получаем данные из формы "booking"
        $dataGuest = $request->only(['first_name', 'last_name', 'phone', 'passport']);
        $dataBooking = $request->only(['id_room', 'id_guest', 'id_admin', 'check_in', 'check_out']);

        //Проверяем, занята ли комната на выбраные даты (возвращает true если занята, false если свободна)
        $boolBooking = DB::table('booking')
            ->join('rooms', 'booking.id_room', '=', 'rooms.id')
            ->whereDate('booking.check_in',  '<', $dataBooking['check_out'])
            ->whereDate('booking.check_out',  '>', $dataBooking['check_in'])
            ->where('rooms.id', '=', $dataBooking['id_room'])
            ->exists();

        //Если комната занята, возвращаем сообщение от ошибке
        $errorBooking = ['booking' => 'error', 'message' => 'Выбранная комната занята на указанные даты'];
        if($boolBooking){
            return response()->json($errorBooking);
        }

        try {
            //Выполняем транзакцию
            DB::transaction(function () use ($dataBooking, $dataGuest) {
                DB::table('guests')->insert($dataGuest);
                DB::table('booking')->insert($dataBooking);
            });
        }catch (Exception $e)
        {
            //если транзакция нарушена то сообщаем об ошибке
            $err['booking'] = 'error';
            $err['message'] = 'Error - ' . $e->getCode() . ' Ошибка выполнения транзакции по сохранению информации в базу данных';

            return response()->json($err);
        }

        return response()->json(['booking'=>'ok', 'message' => 'Комната успешно забронирована']);
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
