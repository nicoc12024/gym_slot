<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SlotController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Middleware\AdminMiddleware;

// Rutas para el panel de administración con autenticación
Route::middleware(['auth', AdminMiddleware::class])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/users', [AdminController::class, 'listUsers'])->name('admin.users');
    Route::get('/admin/users/{id}/edit', [ProfileController::class, 'edit'])->name('admin.users.edit');
    Route::patch('/admin/users/{id}', [ProfileController::class, 'update'])->name('admin.users.update');
});


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::post('/book-slot', [SlotController::class, 'bookSlot'])->name('book-slot');
    Route::get('/dashboard', [SlotController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
    Route::post('/delete-slot', [SlotController::class, 'deleteSlot'])->name('delete-slot');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
});

require __DIR__.'/auth.php';
