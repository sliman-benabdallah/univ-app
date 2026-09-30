// app/page.tsx
import DownloadPdfButton from "@/components/DownloadPdfButton";
import Legend from "@/components/Legend";
import ScheduleGrid from "@/components/ScheduleGrid";
import ScheduleHeader from "@/components/ScheduleHeader";
import { BRANDING } from "@/lib/branding";
import {
    CLASS_DURATION_MINUTES,
    DAY_END_MINUTES,
    DAY_START_MINUTES,
    SCHOOL_DAYS,
    TIME_SLOTS,
    formatDuration,
    minutesToTime,
} from "@/lib/config";
import { WEEKLY_SCHEDULE } from "@/lib/scheduleData";

/**
 * Home page — assembles the header, the legend and the weekly grid.
 * All the real logic lives in the separate components.
 */
export default function HomePage() {
    return (
        <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-6">
                {/* ------------------------- Page header ------------------------ */}
                <ScheduleHeader
                    title={BRANDING.name}
                    subtitle={BRANDING.tagline}
                    stats={[
                        { label: "Days", value: `${SCHOOL_DAYS.length}` },
                        { label: "Periods / day", value: `${TIME_SLOTS.length}` },
                        { label: "Class length", value: formatDuration(CLASS_DURATION_MINUTES) },
                        {
                            label: "Day",
                            value: `${minutesToTime(DAY_START_MINUTES)} – ${minutesToTime(DAY_END_MINUTES)}`,
                        },
                    ]}
                    actions={<DownloadPdfButton schedule={WEEKLY_SCHEDULE} />}
                />

                {/* ---------------------------- Legend -------------------------- */}
                <Legend />

                {/* ------------------------ The timetable ----------------------- */}
                <ScheduleGrid schedule={WEEKLY_SCHEDULE} />

                {/* ---------------------------- Footer -------------------------- */}
                <p className="pb-4 text-center text-xs text-slate-400">
                    {TIME_SLOTS.length} periods per day ·{" "}
                    {formatDuration(CLASS_DURATION_MINUTES)} per class · no breaks
                </p>
            </div>
        </main>
    );
}