<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rooms extends Model
{
    use HasFactory;
    protected $table = 'rooms';

    public function tasks() {

        return $this->hasMany(Tasks::class, 'id_room');
    }
    public function room_cleaning() {

        return $this->hasMany(Room_cleaning::class, 'room_number');
    }
    public function category() {

        return $this->belongsTo(Categories::class, 'id_category');
    }

    public function booking() {

        return $this->hasMany(Booking::class, 'id_room');
    }
}
