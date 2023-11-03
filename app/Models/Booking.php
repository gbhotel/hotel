<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
//    use HasFactory;
    protected $table = 'booking';

    public function rooms() {

        return $this->belongsTo(Rooms::class, 'id_room');
    }

    public function checkIn() {
        return $this->hasOne(Check_in::class, 'id_booking');
    }
}
