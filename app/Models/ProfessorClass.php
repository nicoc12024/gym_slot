<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfessorClass extends Model
{
    use HasFactory;

    protected $table = 'professor_class'; // Especifica la tabla pivote

    protected $fillable = ['professor_id', 'lesson_id']; // Debería ser `lesson_id` en lugar de `class_id`
}