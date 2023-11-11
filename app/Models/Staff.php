<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use HasFactory;
    protected $table = 'staff';

    public function position() {

        return $this->belongsTo(Positions::class, 'id_position');
    }

    public function user() {

        return $this->belongsTo(User::class, 'id_user');
    }

    public function booking() {

        return $this->belongsTo(Booking::class, 'id_admin');
    }
    public function check_in() {

        return $this->hasMany(Categories::class, 'id_admin');
    }
}
