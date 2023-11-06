<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;
    protected $table = 'booking';

    public function rooms() {

        return $this->belongsTo(Rooms::class, 'id_room');
    }
    public function guest() {

        return $this->belongsTo(Guests::class, 'id_guest');
    }
    public function staff() {

        return $this->belongsTo(Staff::class, 'id_admin');
    }

    public function check_in() {
        return $this->hasOne(Check_in::class, 'id_booking');
    }
}
