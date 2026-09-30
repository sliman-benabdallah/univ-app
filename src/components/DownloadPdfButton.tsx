// components/DownloadPdfButton.tsx
"use client";

import { useState } from "react";
import type { Schedule } from "@/types/schedule";

interface DownloadPdfButtonProps {
    /** The schedule that will be written into the PDF. */
    schedule: Schedule;
    /** Optional file name (without extension). */
    fileName?: string;
}

type Status = "idle" | "working" | "error";

/**
 * Button that exports the weekly schedule as a PDF.
 *
 * The PDF module (and therefore jsPDF) is imported dynamically inside
 * the click handler so it is only downloaded when actually needed.
 */
export default function DownloadPdfButton({
    schedule,
    fileName = "weekly-schedule",
}: DownloadPdfButtonProps) {
    const [status, setStatus] = useState<Status>("idle");

    async function handleDownload() {
        if (status === "working") return; // prevent double clicks

        setStatus("working");
        try {
            // Lazy import keeps jsPDF out of the initial client bundle
            const { exportScheduleToPdf } = await import(
                "@/lib/pdf/exportScheduleToPdf"
            );
            exportScheduleToPdf(schedule, { fileName });
            setStatus("idle");
        } catch (error) {
            console.error("Failed to generate the PDF:", error);
            setStatus("error");
        }
    }

    return (
        <div className="flex flex-col items-end gap-1">
            <button
                type="button"
                onClick={handleDownload}
                disabled={status === "working"}
                aria-busy={status === "working"}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {status === "working" ? (
                    /* Spinner while the PDF is being built */
                    <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                    </svg>
                ) : (
                    /* Download icon */
                    <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M12 3v12" />
                        <path d="m7 10 5 5 5-5" />
                        <path d="M5 21h14" />
                    </svg>
                )}

                {status === "working" ? "Generating…" : "Download PDF"}
            </button>

            {status === "error" && (
                <span className="text-xs text-rose-600">
                    Could not create the PDF. Please try again.
                </span>
            )}
        </div>
    );
}