<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\director\AnalysisController;
use App\Http\Controllers\director\ProfileController;
use App\Http\Controllers\files\FileController;
use App\Http\Controllers\staff\EmployeeController;
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

Route::get('admin/rooms', [RoomsController::class, 'getRooms'])->name('admin.rooms')->middleware('can:get-rooms');
Route::get('admin/check_in_rooms', [RoomsController::class, 'getCheckInRooms'])->name('admin.checkInRooms')->middleware('can:get-check-in-rooms');
Route::get('admin/roomsForCleaning', [RoomsController::class, 'getRoomsForCleaning'])->name('admin.roomsForCleaning')->middleware('can:get-rooms-for-cleaning');
Route::post('admin/free-rooms-period', [RoomsController::class, 'getFreeRoomsPeriod'])->name('admin.free-rooms-period')->middleware('can:get-free-rooms-period');
Route::get('admin/room/{id}/get-room', [RoomController::class, 'getRoom'])->name('admin.room.get-room')->middleware('can:get-room');
Route::get('admin/room/{id}/get-room-info', [RoomController::class, 'getRoomInfo'])->name('admin.room.get-room-info')->middleware('can:admin-get-room-info');

Route::put('admin/room/cancel-book-room', [RoomController::class, 'cancelBookRoom'])->name('admin.room.cancel-book-room')->middleware('can:cancel-book-room');
Route::post('admin/room/check-in-room', [RoomController::class, 'checkInRoom'])->name('admin.room.check-in-room')->middleware('can:check-in-room');
Route::put('admin/room/eviction-from-room', [RoomController::class, 'evictionFromRoom'])->name('admin.eviction-from-room')->middleware('can:aviction-from-room');

Route::get('admin/staff', [StaffController::class, 'getStaff'])->name('admin.staff')->middleware('can:get-staff');
Route::match(['get', 'post'], 'admin/employee/{id}', [StaffController::class, 'getEmployee'])->name('admin.employee')->middleware('can:get-employee');
Route::match(['put'], 'admin/employee/edit/{id}', [StaffController::class, 'editEmployee'])->name('admin.edit.employee')->middleware('can:edit-employee');
Route::post('admin/staff/working-in', [StaffController::class, 'setWorkingInEmployee'])->middleware('can:working-in');
Route::post('admin/staff/working-out', [StaffController::class, 'setWorkingOutEmployee'])->middleware('can:working-out');


Route::get('admin/booking', [BookingController::class, 'getBooking'])->name('admin.booking')->middleware('can:get-booking');
Route::post('admin/room/book-room', [RoomController::class, 'bookRoom'])->name('admin.room.book-room')->middleware('can:book-room');
Route::delete('/admin/booking/{id}/delete', [BookingController::class, 'deleteBooking'])->name('admin.delete.booking')->middleware('can:admin-delete-booking');
Route::get('/admin/booking/get/{id}', [BookingController::class, 'getOneBooking'])->name('admin.get.one.booking')->middleware('can:admin-get-one-booking');
Route::post('/admin/save-edited-booking', [BookingController::class, 'saveEditedBooking'])->name('admin.save.edited.booking')->middleware('can:admin-save-edited-booking');

Route::get('admin/tasks', [TasksController::class, 'getTasks'])->name('admin.tasks')->middleware('can:get-tasks');
Route::post('admin/addTask', [TasksController::class, 'addTask'])->name('admin.addTask')->middleware('can:add-task');
Route::put('admin/updateTask', [TasksController::class, 'updateTask'])->name('admin.updateTask')->middleware('can:update-task');
Route::delete('admin/deleteTask/{id}', [TasksController::class, 'deleteTask'])->name('admin.deleteTask')->middleware('can:delete-task');

//роуты гостя
Route::get('/guest/room', [GuestController::class, 'getInfoAboutGuestRoom']);
Route::post('/guest/feedback', [GuestController::class, 'setFeedback']);
Route::get('/guest/requests', [GuestController::class, 'getRequests'])->name('guest.requests');
Route::post('guest/setRequests', [GuestController::class, 'setRequests'])->name('guest.setRequests');

//роуты для сотрудников

Route::post('employee/{id}/tasks', [TasksController::class, 'getTasksForEmployee'])->name('employee.tasks')->middleware('can:get-tasks');
Route::put('employee/changeTaskStatus', [TasksController::class, 'changeTaskStatus'])->name('employee.changeTaskStatus')->middleware('can:change-tasks-status');



Route::get('director/staff', [DirectorStaffController::class, 'getStaff'])->middleware('can:director-get-staff');
Route::get('director/employee/{id}', [DirectorStaffController::class, 'getEmployee'])->middleware('can:director-get-employee');
Route::get('director/get-all-positions', [DirectorStaffController::class, 'getAllPositions'])->middleware('can:director-get-all-positions');
Route::get('director/get-all-roles', [DirectorStaffController::class, 'getAllRoles'])->middleware('can:director-get-all-roles');
Route::post('director/create-employee', [DirectorStaffController::class, 'createEmployee'])->middleware('can:director-create-employee');
Route::post('director/edit-employee', [DirectorStaffController::class, 'editEmployee'])->middleware('can:director-edit-employee');
Route::put('director/dismiss-employee', [DirectorStaffController::class, 'dismissUser'])->middleware('can:director-dismiss-user');
Route::get('director/analysis', [AnalysisController::class, 'getCountStaff'])->middleware('can:get-count-staff');
Route::get('director/analysis-dismiss', [AnalysisController::class, 'getCountStaffDismiss'])->middleware('can:get-count-staff-dismiss');
Route::post('director/analysis-quantity-rooms', [AnalysisController::class, 'getCountRooms'])->middleware('can:get-count-rooms');
Route::post('director/analysis-quantity-guests', [AnalysisController::class, 'getCountGuests'])->middleware('can:get-count-guests');
Route::get('director/profile/get-my-data', [ProfileController::class, 'getMyData'])->middleware('can:get-my-data');
Route::post('director/profile/get-update-my-data', [ProfileController::class, 'updateMyData'])->middleware('can:get-update-my-data');
Route::post('director/profile/change-password', [ProfileController::class, 'changePassword'])->middleware('can:change-password');
Route::post('director/profile/change-photo', [ProfileController::class, 'changePhoto'])->middleware('can:change-photo');

Route::get('isauth', [AuthController::class, 'isAuth']);
Route::get('userRole', [AuthController::class, 'getRole']);
Route::get('user', [AuthController::class, 'getCurrentUser']);
Route::put('user/update', [AuthController::class, 'update']);

Route::post('/upload', [FileController::class, 'upload']);


