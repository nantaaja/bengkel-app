<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SparepartController;
use App\Http\Controllers\Api\ServiceTypeController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\LaporanController;
use App\Http\Controllers\Api\LaporanOwnerController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;

// Route::get('/dashboard', [DashboardController::class, 'index']);
// Route::get('/laporan', [LaporanController::class, 'index']);
// Route::apiResource('spareparts', SparepartController::class);
// Route::get('/service-types', [ServiceTypeController::class, 'index']);
// Route::get('/services', [ServiceController::class, 'index']);
// Route::post('/services', [ServiceController::class, 'store']);
// Route::get('/services/{id}', [ServiceController::class, 'show']);
// Route::put('/services/{id}', [ServiceController::class, 'update']);
// Route::delete('/services/{id}', [ServiceController::class, 'destroy']);
// Route::get('/owner/laporan', [LaporanOwnerController::class, 'index']);
Route::post('/auth/google', [AuthController::class, 'googleLogin']);

// Semua route yang butuh login bungkus ke sini
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/laporan', [LaporanController::class, 'index']);
    Route::apiResource('spareparts', SparepartController::class);
    Route::get('/service-types', [ServiceTypeController::class, 'index']);
    Route::get('/services', [ServiceController::class, 'index']);
    Route::post('/services', [ServiceController::class, 'store']);
    Route::get('/services/{id}', [ServiceController::class, 'show']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);
    Route::get('/owner/laporan', [LaporanOwnerController::class, 'index']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/laporan-owner', [LaporanOwnerController::class, 'index']);
    Route::apiResource('users', UserController::class);
    });
