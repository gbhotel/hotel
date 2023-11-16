<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RoomsController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])->middleware('auth')->name('home');

Auth::routes();

//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/getrole', [AuthController::class, 'getRole']);
Route::get('/isauth', [AuthController::class, 'isAuth']);

//заглушки, чтобы никто не мог сам зарегистрироваться и зайти на сайт
Route::get('/register', [HomeController::class, 'index']);
Route::get('/password/reset', [HomeController::class, 'index']);

// оставить последним
Route::fallback([\App\Http\Controllers\HomeController::class, 'index']);
