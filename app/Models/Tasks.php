<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    use HasFactory;
    protected $fillable = [
        'employee_name',
        'name',
        'id_room',
        'id_staff',
        'comment'
    ];

    public function room() {
        return $this->belongsTo(Rooms::class, 'id_room');
    }

    public function employee() {
        return $this->belongsTo(Staff::class, 'id_staff');
    }
}
