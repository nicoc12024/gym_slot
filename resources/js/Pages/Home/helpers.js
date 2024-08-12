export const hours = Array.from({ length: 24 }, (_, i) => ({
    name: `${i.toString().padStart(2, "0")}:00:00`,
}));

export const daysOfWeek = ["L", "M", "X", "J", "V", "S", "D"];

export const fullDaysOfWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
];

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getWeekDates = (offset = 0) => {
    const now = new Date();
    const currentDayOfWeek = now.getDay(); // 0 (Domingo) to 6 (Sábado)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(
        now.getDate() -
            currentDayOfWeek +
            (currentDayOfWeek === 0 ? -6 : 1) +
            offset * 7
    );

    const days = [];
    const months = new Set();
    const years = new Set();

    for (let i = 0; i < 7; i++) {
        const dayDate = new Date(startOfWeek);
        dayDate.setDate(startOfWeek.getDate() + i);
        days.push(dayDate.getDate());
        months.add(
            capitalizeFirstLetter(
                dayDate.toLocaleString("es-ES", { month: "long" })
            )
        );
        years.add(dayDate.getFullYear());
    }

    const yearRange = Array.from(years).join(" - ");

    return { days, months: Array.from(months).join(" - "), yearRange };
};

export const getCurrentWeekNumber = (offset = 0) => {
    const now = new Date();
    now.setDate(now.getDate() + offset * 7);
    const oneJan = new Date(now.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((now - oneJan) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((numberOfDays + oneJan.getDay() + 1) / 7);
    return weekNumber;
};

export const isSlotDisabled = (
    dayIndex,
    hour,
    currentWeekDates,
    currentTime,
    weekOffset
) => {
    const slotDate = new Date(currentTime);
    slotDate.setDate(currentWeekDates[dayIndex]);
    const [hourPart] = hour.split(":");
    slotDate.setHours(hourPart);
    slotDate.setMinutes(0);
    slotDate.setSeconds(0);
    slotDate.setMilliseconds(0);

    return weekOffset < 0 || (weekOffset === 0 && slotDate <= currentTime);
};
