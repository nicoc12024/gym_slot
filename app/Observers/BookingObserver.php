<?php

namespace App\Observers;

use App\Models\Booking;
use App\Notifications\SlotBooked;


class BookingObserver
{
    /**
     * Handle the Booking "created" event.
     */
    public function created(Booking $booking)
    {
        $user = $booking->user;
        if ($user->email_notifications) {
            $user->notify(new SlotBooked($booking, 'booked'));
        }
    }

    /**
     * Handle the Booking "updated" event.
     */
    public function updated(Booking $booking): void
    {
        //
    }

    /**
     * Handle the Booking "deleted" event.
     */
    public function deleted(Booking $booking)
    {
        $user = $booking->user;
        if ($user->email_notifications) {
            $user->notify(new SlotBooked($booking, 'cancelled'));
        }
    }

    /**
     * Handle the Booking "restored" event.
     */
    public function restored(Booking $booking): void
    {
        //
    }

    /**
     * Handle the Booking "force deleted" event.
     */
    public function forceDeleted(Booking $booking): void
    {
        //
    }
}
