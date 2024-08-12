import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

const useBookings = (initialBookings) => {
    const [bookedSlots, setBookedSlots] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [slotToDelete, setSlotToDelete] = useState(null);

    useEffect(() => {
        setBookedSlots(initialBookings);
    }, [initialBookings]);
    const handleBookSlot = (fullDate, startTime) => {
        router.post(
            route("book-slot"),
            { date: fullDate, time: startTime },
            { preserveScroll: true }
        );
    };
    const handleDeleteSlot = () => {
        router.post(
            route("delete-slot"),
            {
                date: slotToDelete.date,
                time: slotToDelete.time,
            },
            {
                preserveScroll: true,
                onFinish: () => {
                    setModalIsOpen(false);
                    setSlotToDelete(null);
                },
            }
        );
    };

    const openModal = (date, time) => {
        setSlotToDelete({ date, time });
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSlotToDelete(null);
    };

    const isUserBooking = (fullDate, hour) => {
        const formattedHour = hour.length === 5 ? `${hour}:00` : hour;
        const bookingSlot = bookedSlots.find(
            (booking) =>
                booking.date === fullDate && booking.time === formattedHour
        );
        return bookingSlot ? bookingSlot.is_current_user : false;
    };

    const isBookedByOthers = (fullDate, hour) => {
        const formattedHour = hour.length === 5 ? `${hour}:00` : hour;
        const bookingSlot = bookedSlots.find(
            (booking) =>
                booking.date === fullDate && booking.time === formattedHour
        );
        return bookingSlot && !bookingSlot.is_current_user;
    };

    return {
        bookedSlots,
        modalIsOpen,
        slotToDelete,
        handleBookSlot,
        handleDeleteSlot,
        openModal,
        closeModal,
        isUserBooking,
        isBookedByOthers,
    };
};

export default useBookings;
