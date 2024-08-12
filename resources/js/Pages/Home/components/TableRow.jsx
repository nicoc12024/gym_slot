import React from "react";

export default function TableRow({}) {
    return (
        <td
            onClick={() => handleBookSlot(currentWeekDays[dayIndex], hour)}
            className="cursor-pointer transition-all duration-250 ease-in-out border w-[200px] border-gray-300 whitespace-nowrap px-3 text-sm text-center"
            key={dayIndex}
        ></td>
    );
}
