<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ejercicio extends Model
{
    use HasFactory;

    protected $table = 'ejercicios';
    protected $fillable = ['descripcion', 'codigo_docente', 'codigo_estudiante'];
}
