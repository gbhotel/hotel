<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rooms extends Model
{
    public function status() {

        return $this->belongsTo(Statuses::class, 'id_status');
    }
}
