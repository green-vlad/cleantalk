<?php

use App\Http\Controllers\Api\EmployeeController;
use App\Http\Middleware\ApiCors;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/{id?}', [EmployeeController::class, 'index']);
Route::post('/save', [EmployeeController::class, 'save']);
Route::delete('/delete/{id}', [EmployeeController::class, 'delete']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

