<?php

namespace App\Http\Controllers;

use App\Models\Rooms;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoomController extends Controller
{

    /**
     * @param $numberRoom
     * @return \Illuminate\Http\JsonResponse
     * Метод возвращает все данные связаные с комнатой (инф. о комнате, статус, о госте, о брони, о заселении итд)
     */
    public function getRoom($numberRoom)
    {
        $date = now()->toDateTimeString();

        $data = DB::table('rooms')
            ->rightJoin('booking', 'rooms.id', '=', 'booking.id_room')
            ->leftJoin('check_in', 'booking.id', '=', 'check_in.id_booking')
            ->leftJoin('categories', 'rooms.id_category', '=', 'categories.id')
            ->leftJoin('staff', 'check_in.id_admin', '=', 'staff.id')
            ->leftJoin('positions', 'staff.id_position', '=', 'positions.id')
            ->leftJoin('users', 'staff.id_user', '=', 'users.id')
            ->leftJoin('staff as staff2', 'booking.id_admin', '=', 'staff2.id')
            ->LeftJoin('positions as positions2', 'staff2.id_position', '=', 'positions2.id')
            ->LeftJoin('users as users2', 'staff2.id_user', '=', 'users2.id')
            ->leftJoin('guests', 'booking.id_guest', '=', 'guests.id')
            ->leftJoin('users as users3', 'guests.id_user', '=', 'users3.id')

            ->where('rooms.number', '=', $numberRoom)
            ->whereDate('check_in.checkIn', '<', $date)
            ->whereDate('check_in.checkOut', '>', $date)

            ->select(
                // О комнате
                'rooms.id as roomId',
                'rooms.number as roomNumber',
                'rooms.price as roomPrice',
                'additional_guest as roomAdditionalGuest',
                'rooms.max_guests as roomMaxGuests',
                'rooms.comfort as roomComfort',
                'categories.category',
                'rooms.sets as roomSets',
                // О госте
                'guests.id as guestsId',
                'users3.first_name as guestsFirstName',
                'users3.last_name as guestsLastName',
                'users3.phone as guestsPhone',
                'users3.email as guestsEmail',
                'users3.passport as guestsPassport',
                'users3.username as guestsUsername',
                'users3.photo as guestsPhoto',
                // О бронировании
                'booking.id as bookingId',
                'booking.check_in as bookingCheckIn',
                'booking.check_out as bookingCheckOut',
                // Сотрудник который забронировал
                'staff2.id as staffIdB',
                'users2.first_name as staffFirstNameB',
                'users2.last_name as staffLastNameB',
                'users2.phone as staffPhoneB',
                'users2.email as staffEmailB',
                'users2.passport as staffPassportB',
                'staff2.employment_date as staffEmploymentDateB',
                'positions2.name as staffPositionB',
                'users2.username as staffUsernameB',
                'users2.photo as staffPhotoB',
                // О заселении
                'check_in.id as checkId',
                'check_in.checkIn as checkCheckIn',
                'check_in.checkOut as checkCheckOut',
                // Сотрудник, который заселял
                'staff.id as staffIdCh',
                'users.first_name as staffFirstNameCh',
                'users.last_name as staffLastNameCh',
                'users.phone as staffPhoneCh',
                'users.email as staffEmailCh',
                'users.passport as staffPassportCh',
                'staff.employment_date as staffEmploymentDateCh',
                'positions.name as staffPositionCh',
                'users.username as staffUsernameCh',
                'users.photo as staffPhotoCh',
            )
            ->get();

        if (!empty($data[0])) {
            $data[0]->status = 'check_in';
        } else {
            $data = DB::table('rooms')
                ->rightJoin('booking', 'rooms.id', '=', 'booking.id_room')
                ->leftJoin('categories', 'rooms.id_category', '=', 'categories.id')
                ->leftJoin('staff as staff2', 'booking.id_admin', '=', 'staff2.id')
                ->LeftJoin('positions as positions2', 'staff2.id_position', '=', 'positions2.id')
                ->LeftJoin('users as users2', 'staff2.id_user', '=', 'users2.id')
                ->leftJoin('guests', 'booking.id_guest', '=', 'guests.id')
                ->leftJoin('users as users3', 'guests.id_user', '=', 'users3.id')

                ->where('id_room', '=', $numberRoom)
                ->whereDate('check_in', '<', $date)
                ->whereDate('check_out', '>', $date)

                ->select(
                    // О комнате
                    'rooms.id as roomId',
                    'rooms.number as roomNumber',
                    'rooms.price as roomPrice',
                    'additional_guest as roomAdditionalGuest',
                    'rooms.max_guests as roomMaxGuests',
                    'rooms.comfort as roomComfort',
                    'categories.category',
                    'rooms.sets as roomSets',
                    // О госте
                    'guests.id as guestsId',
                    'users3.first_name as guestsFirstName',
                    'users3.last_name as guestsLastName',
                    'users3.phone as guestsPhone',
                    'users3.email as guestsEmail',
                    'users3.passport as guestsPassport',
                    'users3.username as guestsUsername',
                    'users3.photo as guestsPhoto',
                    // О бронировании
                    'booking.id as bookingId',
                    'booking.check_in as bookingCheckIn',
                    'booking.check_out as bookingCheckOut',
                    // Сотрудник который забронировал
                    'staff2.id as staffIdB',
                    'users2.first_name as staffFirstNameB',
                    'users2.last_name as staffLastNameB',
                    'users2.phone as staffPhoneB',
                    'users2.email as staffEmailB',
                    'users2.passport as staffPassportB',
                    'staff2.employment_date as staffEmploymentDateB',
                    'positions2.name as staffPositionB',
                    'users2.username as staffUsernameB',
                    'users2.photo as staffPhotoB',
                )
                ->get();

            if (!empty($data[0])) {
                $data[0]->status = 'booking';
            } else {
                $data = DB::table('rooms')
                    ->join('categories', 'rooms.id_category', '=', 'categories.id')
                    ->leftJoin('rooms_closed', 'rooms_closed.id_rooms', '=', 'rooms.id')

                    ->where('rooms.id', '=', $numberRoom)
                    ->whereNull('rooms_closed.id')

                    ->select(
                        'rooms.id as roomId',
                        'rooms.number as roomNumber',
                        'rooms.price as roomPrice',
                        'additional_guest as roomAdditionalGuest',
                        'rooms.max_guests as roomMaxGuests',
                        'rooms.comfort as roomComfort',
                        'categories.category',
                        'rooms.sets as roomSets',
                    )
                    ->get();

                if (!empty($data[0])) {
                    $data[0]->status = 'free';
                } else {
                    $data = DB::table('rooms')
                        ->join('categories', 'rooms.id_category', '=', 'categories.id')
                        ->leftJoin('rooms_closed', 'rooms_closed.id_rooms', '=', 'rooms.id')
                        ->leftJoin('staff as staff2', 'rooms_closed.employee', '=', 'staff2.id')
                        ->LeftJoin('users as users2', 'staff2.id_user', '=', 'users2.id')
                        ->LeftJoin('positions as positions2', 'staff2.id_position', '=', 'positions2.id')

                        ->where('rooms.id', '=', $numberRoom)
                        ->where('rooms_closed.id', '>', 0)

                        ->select(
                            'rooms.id as roomId',
                            'rooms.number as roomNumber',
                            'rooms.price as roomPrice',
                            'additional_guest as roomAdditionalGuest',
                            'rooms.max_guests as roomMaxGuests',
                            'rooms.comfort as roomComfort',
                            'categories.category',
                            'rooms.sets as roomSets',
                            // О закрытии
                            'rooms_closed.id as closedId',
                            'rooms_closed.closure_at as closedClosure',
                            'rooms_closed.opening_at as closedOpening',
                            //                            // Сотрудник который забронировал
                            'staff2.id as staffIdCl',
                            'users2.first_name as staffFirstNameCl',
                            'users2.last_name as staffLastNameCl',
                            'users2.phone as staffPhoneCl',
                            'users2.email as staffEmailCl',
                            'users2.passport as staffPassportCl',
                            'staff2.employment_date as staffEmploymentDateCl',
                            'positions2.name as staffPositionCl',
                            'users2.username as staffUsernameCl',
                            'users2.photo as staffPhotoCl',
                        )
                        ->get();

                    $data[0]->status = 'closed';
                }
            }
        }

        $comfort = json_decode($data[0]->roomComfort);
        $roomSets = json_decode($data[0]->roomSets);

        $data[0]->wifi = $comfort->wifi;
        $data[0]->bed = $comfort->bed;
        $data[0]->toilet = $comfort->toilet;
        $data[0]->shower = $comfort->shower;
        $data[0]->roomsNumber = $comfort->roomsNumber;
        $data[0]->conditioner = $comfort->conditioner;

        $data[0]->towel = $roomSets->{'полотенце'};
        $data[0]->slippers = $roomSets->{'тапочки'};
        $data[0]->shampoo = $roomSets->{'шампунь'};
        $data[0]->showerGel = $roomSets->{'гель для душа'};

        unset($data[0]->roomComfort);
        unset($data[0]->roomSets);

        return response()->json($data);
    }

    public function getRoomInfo($id)
    {
        $room = Rooms::where('id', $id)->with('category')->get()->first();
        $data[] = [
            'images' => json_decode($room->images),
            'number' => $room->number,
            'price' => $room->price,
            'max_guests' => $room->max_guests,
            'category' => $room->category->category,
            'comfort' => json_decode($room->comfort, true),
            'sets' => json_decode($room->sets, true),
        ];
        return response()->json($data);
    }

    public function bookRoom(Request $request)
    {
        $response = [];

        $data = $request->only([
            'first_name',
            'last_name',
            'phone',
            'id_room',
            'checkinDate',
            'checkoutDate',
        ]);

        $role = DB::table('roles')
            ->where('roles.name', 'гость')
            ->first();

        if (!empty($data)) {

            $newUserId  = DB::table('users')
                ->insertGetId([
                    'first_name' => $data['first_name'],
                    'last_name' => $data['last_name'],
                    'phone' => $data['phone'],
                    'role_id' => $role->id,
                ]);

            $newGuestId  = DB::table('guests')
                ->insertGetId([
                    'id_user' => $newUserId
                ]);

            $newBooking = DB::table('booking')
                ->insertGetId([
                    'id_guest' => $newGuestId,
                    'id_room' => $data['id_room'],
                    'check_in' => date($data['checkinDate']),
                    'check_out' => date($data['checkoutDate']),
                    'id_admin' => 3
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
