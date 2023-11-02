<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Statuses extends Model
{
    use HasFactory;

    public function rooms() {

        return $this->hasMany(Rooms::class, 'id_status');
    }
}
