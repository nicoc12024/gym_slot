<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request, $id = null): Response
    {
        $user = $id ? User::findOrFail($id) : $request->user();

        return Inertia::render('Profile/Edit', [
            'user' => $user, // Pasamos el usuario a la vista
            'auth' => ['user' => $request->user()], // El usuario autenticado (administrador)
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request, $id = null): RedirectResponse
    {
        $user = $id ? User::findOrFail($id) : $request->user();

        $user->fill($request->all());

        // Si el email ha cambiado, restablecer la verificación
        if ($request->has('email') && $user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        // Redirigir de vuelta al formulario de edición del mismo usuario que se está actualizando
        return Redirect::route($id ? 'admin.users.edit' : 'profile.edit', $user->id)->with('status', 'profile-updated');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
