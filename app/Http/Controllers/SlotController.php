<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SlotController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $bookings = Booking::all()->map(function ($booking) use ($user) {
            return [
                'date' => $booking->date,
                'time' => $booking->time,
                'user_id' => $booking->user_id,
                'is_current_user' => $booking->user_id == $user->id,
            ];
        });
    
        return Inertia::render('Dashboard', [
            'bookings' => $bookings,
        ]);
    }

    public function bookSlot(Request $request)
    {
        $user = Auth::user();
        $date = $request->input('date');
        $time = $request->input('time');

        // Usuario ya tiene un slot para esa fecha?
        $existingUserBooking = Booking::where('user_id', $user->id)
            ->where('date', $date)
            ->first();

        if ($existingUserBooking) {
            return redirect()->route('dashboard')->withErrors(['message' => 'You have already booked a slot for today.']);
        }

        // Slot reservado por otro usuario?
        $existingBooking = Booking::where('date', $date)
            ->where('time', $time)
            ->first();

        if ($existingBooking) {
            return redirect()->route('dashboard')->withErrors(['message' => 'This slot is already booked by another user.']);
        }

        Booking::create([
            'user_id' => $user->id,
            'date' => $date,
            'time' => $time,
        ]);

        return redirect()->route('dashboard');
    }

    public function deleteSlot(Request $request)
    {
        $user = Auth::user();
        $date = $request->input('date');
        $time = $request->input('time');

        $booking = Booking::where('user_id', $user->id)
            ->where('date', $date)
            ->where('time', $time)
            ->first();

        if ($booking) {
            $booking->delete();
            return redirect()->route('dashboard')->with('success', 'Booking deleted successfully.');
        }

        return redirect()->route('dashboard')->with('error', 'Booking not found.');
    }
}
