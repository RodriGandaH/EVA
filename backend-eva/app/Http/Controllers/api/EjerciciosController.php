<?php

namespace App\Http\Controllers\api;

use App\Models\Ejercicio;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EjerciciosController extends Controller
{

    public function index()
    {
        $ejercicios = Ejercicio::all();
        return response()->json($ejercicios);
    }

    public function store(Request $request)
    {
        $ejercicio = new Ejercicio;
        $ejercicio->descripcion = $request->input('descripcion');
        $ejercicio->codigo_docente = $request->input('codigo_docente');
        $ejercicio->codigo_estudiante = $request->input('codigo_estudiante');
        $ejercicio->save();

        return response()->json($ejercicio, 201);
    }

    public function show($id)
    {
        $ejercicio = Ejercicio::findOrFail($id);
        return response()->json($ejercicio);
    }
}
