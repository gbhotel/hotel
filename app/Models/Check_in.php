<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Check_in extends Model
{
    use HasFactory;

    protected $table = 'check_in';

    public function booking() {
        return $this->belongsTo(Booking::class, 'id_booking');
    }

    public function staff() {

        return $this->belongsTo(Categories::class, 'checkIn');
    }
}
