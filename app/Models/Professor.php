<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Professor extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'surname'];

    // Relación muchos a muchos con las clases
    public function lessons()
    {
        return $this->belongsToMany(Lesson::class, 'professor_class');
    }
}