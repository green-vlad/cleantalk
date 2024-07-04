<?php

use App\Http\Controllers\Api\EmployeeController;
use App\Http\Middleware\ApiCors;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/', [EmployeeController::class, 'index'])->middleware(ApiCors::class);
