<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'max_students'];

    // Relación muchos a muchos con los profesores
    public function professors()
    {
        return $this->belongsToMany(Professor::class, 'professor_class');
    }
}