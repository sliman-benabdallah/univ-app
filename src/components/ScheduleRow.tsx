// components/ScheduleRow.tsx
import type { SchoolClass, TimeSlot } from "@/types/schedule";
import { GRID_TEMPLATE_COLUMNS, SCHOOL_DAYS } from "@/lib/config";
import ClassCard from "./ClassCard";
import EmptySlot from "./EmptySlot";
import TimeLabel from "./TimeLabel";

interface ScheduleRowProps {
    /** The period shown on the left of the row. */
    slot: TimeSlot;
    /**
     * One entry per school day, in the same order as `SCHOOL_DAYS`.
     * `null` means the slot is free.
     */
    classes: (SchoolClass | null)[];
}

/**
 * One horizontal row of the timetable = one period of the day,
 * with the time label on the left and six day cells on the right.
 */
export default function ScheduleRow({ slot, classes }: ScheduleRowProps) {
    return (
        <div
            className="grid min-h-[110px] border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50"
            style={{ gridTemplateColumns: GRID_TEMPLATE_COLUMNS }}
        >
            {/* Column 1: the period time label */}
            <TimeLabel slot={slot} />

            {/* Columns 2..7: one cell per school day */}
            {SCHOOL_DAYS.map((day, dayIndex) => {
                const schoolClass = classes[dayIndex];

                return (
                    <div key={day} className="flex border-l border-slate-100 p-2">
                        {schoolClass ? (
                            <ClassCard schoolClass={schoolClass} />
                        ) : (
                            <EmptySlot />
                        )}
                    </div>
                );
            })}
        </div>
    );
}