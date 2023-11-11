<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guests extends Model
{
    use HasFactory;
    protected $table = 'guests';


    public function user() {

        return $this->belongsTo(User::class, 'id_user');
    }
    public function booking() {

        return $this->belongsTo(Booking::class, 'id_guest');
    }
}
