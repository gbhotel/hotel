<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use HasFactory;
    protected $table = 'staff';

    public function booking() {

        return $this->belongsTo(Booking::class, 'id_admin');
    }
    public function check_in() {

        return $this->hasMany(Categories::class, 'id_admin');
    }
}
