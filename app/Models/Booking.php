<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date',
        'time',
        'lesson_id',      
        'professor_id',   
        'max_students',   
        'booked_students' 
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function professor()
    {
        return $this->belongsTo(Professor::class);
    }
}
