<?php

use App\Http\Controllers\admin\StaffController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\RoomsController;
use Illuminate\Support\Facades\Route;

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
Route::post('admin/free-rooms-period', [RoomsController::class, 'getFreeRoomsPeriod'])->name('admin.free-rooms-period');
Route::get('admin/room/{id}/get-room', [RoomController::class, 'getRoom'])->name('admin.room.get-room');
Route::put('admin/room/book-room', [RoomController::class, 'bookRoom'])->name('admin.room.book-room');
Route::put('admin/room/cancel-book-room', [RoomController::class, 'cancelBookRoom'])->name('admin.room.cancel-book-room');
Route::post('admin/room/check-in-room', [RoomController::class, 'checkInRoom'])->name('admin.room.check-in-room');
Route::put('admin/room/eviction-from-room', [RoomController::class, 'evictionFromRoom'])->name('admin.eviction-from-room');


Route::get('admin/staff', [StaffController::class, 'getStaff'])->name('admin.staff');
Route::get('admin/employee/{id}', [StaffController::class, 'getEmployee'])->name('admin.employee');
Route::match(['get', 'put'],'admin/employee/edit/{id}', [StaffController::class, 'editEmployee'])->name('admin.edit.employee');
