import React, { useEffect, useState } from "react";
import useCalendar from "../useCalendar";
import useBookings from "../useBookings";
import WeekNavigator from "./WeekNavigator";
import { usePage } from "@inertiajs/react";
import Modal from "../../../Components/Modal";

const Calendar = () => {
    const { bookings, errors } = usePage().props;
    const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];
    const {
        currentWeekDays,
        hours,
        isSlotInPast,
        isToday,
        weekOffset,
        setWeekOffset,
        currentMonths,
        currentYearRange,
        currentWeekNumber,
    } = useCalendar();

    const {
        modalIsOpen,
        handleBookSlot,
        handleDeleteSlot,
        openModal,
        closeModal,
        isUserBooking,
        isBookedByOthers,
    } = useBookings(bookings);

    const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (errors.message) {
            setErrorMessage(errors.message);
            setErrorModalIsOpen(true);
        }
    }, [errors]);

    const closeErrorModal = () => {
        setErrorModalIsOpen(false);
        setErrorMessage("");
    };

    const handleCellClick = (fullDate, hour, isPast, isBookedByUser) => {
        if (isPast) return;

        if (isBookedByUser) {
            openModal(fullDate, hour);
            return;
        }

        handleBookSlot(fullDate, hour);
    };

    return (
        <div className="overflow-x-auto">
            <WeekNavigator
                weekOffset={weekOffset}
                setWeekOffset={setWeekOffset}
                currentWeekNumber={currentWeekNumber}
                currentMonths={currentMonths}
                currentYearRange={currentYearRange}
            />
            <table className="mt-20 min-w-full border-collapse table-fixed divide-y divide-gray-300">
                <thead>
                    <tr>
                        <th className="sm:py-3.5 py-1 min-w-[80px] w-[200px] text-center font-light sm:text-[16px] text-[14px]">
                            GMT-3
                        </th>
                        {daysOfWeek.map((day, index) => (
                            <th key={index}>{day}</th>
                        ))}
                    </tr>
                    <tr>
                        <td></td>
                        {currentWeekDays.map((day, index) => (
                            <td
                                scope="col"
                                className={`bg-white sm:min-w-screen min-w-[100px] border-x sm:py-4 py-5 min-w-screen text-center text-[16px] font-light ${
                                    isToday(day.fullDate)
                                        ? "bg-blue-500 text-white rounded-full"
                                        : ""
                                }`}
                                key={index}
                            >
                                {isToday(day.fullDate) ? (
                                    <div className="bg-blue-500 flex items-center justify-center text-white w-10 h-10 mx-auto rounded-full">
                                        <span>{day.dayOfMonth}</span>
                                    </div>
                                ) : (
                                    day.dayOfMonth
                                )}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {hours.map((hour, index) => (
                        <tr key={index}>
                            <td className="border sticky bg-white left-0 py-4 border-gray-200 whitespace-nowrap text-center text-[10px]">
                                {hour}
                            </td>
                            {currentWeekDays.map((day, dayIndex) => {
                                const fullDate = day.fullDate;
                                const isPast = isSlotInPast(fullDate, hour);
                                const isBookedByUser = isUserBooking(
                                    fullDate,
                                    hour
                                );
                                const isBookingByOthers = isBookedByOthers(
                                    fullDate,
                                    hour
                                );

                                return (
                                    <td
                                        onClick={() =>
                                            handleCellClick(
                                                fullDate,
                                                hour,
                                                isPast,
                                                isBookedByUser,
                                                isBookingByOthers
                                            )
                                        }
                                        className={`transition-all duration-250 ease-in-out border min-w-[180px] whitespace-nowrap px-3 text-sm text-center ${
                                            isPast
                                                ? "bg-gray-300 cursor-not-allowed"
                                                : isBookedByUser
                                                ? "bg-green-500 cursor-pointer text-white"
                                                : isBookingByOthers
                                                ? "bg-gray-300 cursor-not-allowed text-white"
                                                : "cursor-pointer"
                                        }`}
                                        key={dayIndex}
                                    >
                                        {isBookedByUser ? "Confirmed" : ""}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={modalIsOpen} onClose={closeModal} maxWidth="md">
                <div className="p-6">
                    <h2 className="text-lg font-medium">
                        Do you want to delete this slot?
                    </h2>
                    <div className="mt-4 flex justify-end">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                            onClick={handleDeleteSlot}
                        >
                            Confirm
                        </button>
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded-md"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal
                show={errorModalIsOpen}
                onClose={closeErrorModal}
                maxWidth="md"
            >
                <div className="p-6">
                    <h2 className="text-lg font-medium">Error</h2>
                    <div className="mt-4">{errorMessage}</div>
                    <div className="mt-4 flex justify-end">
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded-md"
                            onClick={closeErrorModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Calendar;
