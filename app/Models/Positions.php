<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Positions extends Model
{
    use HasFactory;
    protected $table = 'positions';

    public function staff() {

        return $this->hasMany(Staff::class, 'id_position');
    }
}
