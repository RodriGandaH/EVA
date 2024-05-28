<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\BasicosController;
use App\Http\Controllers\api\EjerciciosController;


/* Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
 */

Route::get('/ejercicio-print', [BasicosController::class, 'generarEjercicioSobrePrint']);

Route::post('/ejercicios', [EjerciciosController::class, 'store']);
Route::get('/ejercicios', [EjerciciosController::class, 'index']);
Route::get('/ejercicios/{id}', [EjerciciosController::class, 'show']);
