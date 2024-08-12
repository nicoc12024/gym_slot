<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SlotBooked extends Notification
{
    use Queueable;

    protected $booking;
    protected $type;

    public function __construct($booking, $type)
    {
        $this->booking = $booking;
        $this->type = $type;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $subject = $this->type == 'booked' ? 'Slot Booking Confirmation' : 'Slot Cancellation Confirmation';
        $message = $this->type == 'booked' ? 'Your slot has been booked successfully.' : 'Your slot has been cancelled successfully.';

        return (new MailMessage)
                    ->subject($subject)
                    ->greeting('Hello ' . $notifiable->name . '!')
                    ->line($message)
                    ->line('Date: ' . $this->booking->date)
                    ->line('Time: ' . $this->booking->time)
                    ->line('Thank you for using our application!')
                    ->salutation('Best regards, THE GYM');
    }
}