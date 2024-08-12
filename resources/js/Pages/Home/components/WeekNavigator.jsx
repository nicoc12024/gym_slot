import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";

const WeekNavigator = ({
    weekOffset,
    setWeekOffset,
    currentWeekNumber,
    currentMonths,
    currentYearRange,
}) => {
    return (
        <div className="absolute right-0 left-0 max-w-[600px] mt-4 mx-auto flex justify-between items-center py-2 sm:py-0 bg-white sm:bg-transparent sm:border-none">
            <div className="flex-1 px-2 flex sm:gap-2 gap-6 justify-center">
                <button
                    className="hover:bg-neutral-100 rounded-[50%] p-1"
                    onClick={() => setWeekOffset(weekOffset - 1)}
                >
                    <KeyboardArrowLeftIcon />
                </button>
                <button
                    className="hover:bg-neutral-100 rounded-[50%] p-1"
                    onClick={() => setWeekOffset(weekOffset + 1)}
                >
                    <KeyboardArrowRightIcon />
                </button>
            </div>
            <div className="flex-2 flex justify-center">
                <button className="py-2 px-4 border rounded sm:text-[20px] text-[14px] hover:bg-neutral-100">
                    Week #{currentWeekNumber} {currentMonths} {currentYearRange}
                </button>
            </div>
            <div className="flex-1 px-2 flex justify-center">
                <button
                    className="hover:bg-neutral-100 rounded-[50%] p-1 cursor-pointer"
                    onClick={() => setWeekOffset(0)}
                    disabled={weekOffset === 0}
                >
                    <ThreeSixtyIcon />
                </button>
            </div>
        </div>
    );
};

export default WeekNavigator;
