<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\BookingController;
use App\Http\Controllers\admin\StaffController;
use App\Http\Controllers\admin\TasksController;
use App\Http\Controllers\guest\GuestController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\RoomsController;
use App\Http\Controllers\director\StaffController as DirectorStaffController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::get('admin/rooms', [RoomsController::class, 'getRooms'])->name('admin.rooms');
Route::get('admin/check_in_rooms', [RoomsController::class, 'getCheckInRooms'])->name('admin.checkInRooms');
Route::get('admin/roomsForCleaning', [RoomsController::class, 'getRoomsForCleaning'])->name('admin.roomsForCleaning');
Route::post('admin/free-rooms-period', [RoomsController::class, 'getFreeRoomsPeriod'])->name('admin.free-rooms-period');
Route::get('admin/room/{id}/get-room', [RoomController::class, 'getRoom'])->name('admin.room.get-room');

Route::put('admin/room/cancel-book-room', [RoomController::class, 'cancelBookRoom'])->name('admin.room.cancel-book-room');
Route::post('admin/room/check-in-room', [RoomController::class, 'checkInRoom'])->name('admin.room.check-in-room');
Route::put('admin/room/eviction-from-room', [RoomController::class, 'evictionFromRoom'])->name('admin.eviction-from-room');

Route::get('admin/staff', [StaffController::class, 'getStaff'])->name('admin.staff');
Route::get('admin/employee/{id}', [StaffController::class, 'getEmployee'])->name('admin.employee');
Route::match(['put'], 'admin/employee/edit/{id}', [StaffController::class, 'editEmployee'])->name('admin.edit.employee');

Route::get('admin/booking', [BookingController::class, 'getBooking'])->name('admin.booking');
Route::post('admin/room/book-room', [RoomController::class, 'bookRoom'])->name('admin.room.book-room');


Route::get('admin/tasks', [TasksController::class, 'getTasks'])->name('admin.tasks');
Route::post('admin/addTask', [TasksController::class, 'addTask'])->name('admin.addTask');


Route::get('guest/requests', [GuestController::class, 'getRequests'])->name('guest.requests');


Route::get('director/staff', [DirectorStaffController::class, 'getStaff']);
Route::get('director/employee/{id}', [DirectorStaffController::class, 'getEmployee']);
Route::get('director/create-employee/get-all-positions', [DirectorStaffController::class, 'getAllPositions']);
Route::get('director/create-employee/get-all-roles', [DirectorStaffController::class, 'getAllRoles']);
Route::post('director/create-employee/create', [DirectorStaffController::class, 'createEmployee']);

Route::get('isauth', [AuthController::class, 'isAuth']);
