<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BasicosController extends Controller
{
    public function generarEjercicioSobrePrint()
    {

        $num1 = rand(1, 100);
        $num2 = rand(1, 100);


        $operadores = ['+', '-', '*', '/'];
        $operador = $operadores[array_rand($operadores)];


        $respuesta_correcta = eval("return $num1 $operador $num2;");


        $opciones_incorrectas = [];
        while (count($opciones_incorrectas) < 3) {
            $opcion = rand($respuesta_correcta - 10, $respuesta_correcta + 10);
            if (!in_array($opcion, $opciones_incorrectas) && $opcion != $respuesta_correcta) {
                $opciones_incorrectas[] = $opcion;
            }
        }


        $opciones = array_merge($opciones_incorrectas, [$respuesta_correcta]);
        shuffle($opciones);

        $pregunta = "¿Qué imprimirá el siguiente código Python?";
        $codigo = "print({$num1} {$operador} {$num2})";

        $ejercicio = [
            'pregunta' => $pregunta,
            'codigo' => $codigo,
            'num1' => $num1,
            'num2' => $num2,
            'operador' => $operador,
            'opciones' => $opciones,
            'respuesta_correcta' => $respuesta_correcta,
        ];


        return response()->json($ejercicio);
    }
}
