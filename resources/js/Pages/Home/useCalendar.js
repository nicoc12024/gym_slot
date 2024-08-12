import { useState, useEffect } from "react";

const useCalendar = () => {
    const [currentWeekDays, setCurrentWeekDays] = useState([]);
    const [weekOffset, setWeekOffset] = useState(0);
    const [currentMonths, setCurrentMonths] = useState("");
    const [currentYearRange, setCurrentYearRange] = useState("");
    const [currentWeekNumber, setCurrentWeekNumber] = useState("");

    useEffect(() => {
        const calculateCurrentWeekDays = () => {
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const startOfWeek = new Date(
                now.setDate(now.getDate() - now.getDay() + 1 + weekOffset * 7)
            ); // Adjust to start on Monday

            const days = [];
            const months = new Set();
            const years = new Set();
            for (let i = 0; i < 7; i++) {
                const dayDate = new Date(startOfWeek);
                dayDate.setDate(startOfWeek.getDate() + i);
                days.push({
                    dayOfMonth: dayDate.getDate(),
                    fullDate: dayDate.toISOString().split("T")[0],
                });
                months.add(dayDate.toLocaleString("en-US", { month: "short" }));
                years.add(dayDate.getFullYear());
            }
            setCurrentWeekDays(days);
            setCurrentMonths(Array.from(months).join(" - "));
            setCurrentYearRange(Array.from(years).join(" - "));
            const oneJan = new Date(now.getFullYear(), 0, 1);
            const numberOfDays = Math.floor(
                (now - oneJan) / (24 * 60 * 60 * 1000)
            );
            const weekNumber = Math.ceil(
                (numberOfDays + oneJan.getDay() + 1) / 7
            );
            setCurrentWeekNumber(weekNumber);
        };

        calculateCurrentWeekDays();

        const interval = setInterval(() => {
            calculateCurrentWeekDays();
        }, 60000);

        return () => clearInterval(interval);
    }, [weekOffset]);

    const hours = Array.from(
        { length: 24 },
        (_, i) => `${i.toString().padStart(2, "0")}:00`
    );

    const isSlotInPast = (slotDate, slotTime) => {
        const now = new Date();
        const slotDateTime = new Date(`${slotDate}T${slotTime}:00`);
        return slotDateTime < now;
    };

    const isToday = (fullDate) => {
        const today = new Date().toISOString().split("T")[0];
        return fullDate === today;
    };

    return {
        currentWeekDays,
        weekOffset,
        setWeekOffset,
        currentMonths,
        currentYearRange,
        currentWeekNumber,
        hours,
        isSlotInPast,
        isToday,
    };
};

export default useCalendar;
