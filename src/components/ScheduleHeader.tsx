// components/ScheduleHeader.tsx
import Logo from "./Logo";

interface Stat {
    label: string;
    value: string;
}

interface ScheduleHeaderProps {
    /** Main page title. */
    title: string;
    /** Small line under the title. */
    subtitle?: string;
    /** Quick facts shown as chips on the right side. */
    stats?: Stat[];
    /** Optional interactive controls (e.g. the PDF download button). */
    actions?: React.ReactNode;
}

/**
 * Page header: logo + title + subtitle on the left,
 * quick stats and action buttons on the right.
 */
export default function ScheduleHeader({
    title,
    subtitle,
    stats = [],
    actions,
}: ScheduleHeaderProps) {
    return (
        <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
            {/* ---------------------- Logo + title block -------------------- */}
            <div className="flex min-w-0 items-center gap-4">
                <Logo size={48} />
                <div className="min-w-0">
                    <h1 className="truncate text-2xl font-bold tracking-tight text-slate-900">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
                    )}
                </div>
            </div>

            {/* ------------------- Stats + action buttons ------------------- */}
            <div className="flex flex-wrap items-center gap-3">
                {stats.length > 0 && (
                    <dl className="flex flex-wrap gap-3">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-xl bg-slate-50 px-3 py-2 text-center"
                            >
                                <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                    {stat.label}
                                </dt>
                                <dd className="text-sm font-semibold text-slate-700">
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                )}

                {actions}
            </div>
        </header>
    );
}