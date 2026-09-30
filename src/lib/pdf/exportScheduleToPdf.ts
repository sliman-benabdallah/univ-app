// lib/pdf/exportScheduleToPdf.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Schedule, SchoolClass } from "@/types/schedule";
import { CLASS_TYPE_STYLES } from "@/lib/classTypeStyles";
import {
    CLASS_DURATION_MINUTES,
    DAY_END_MINUTES,
    DAY_START_MINUTES,
    SCHOOL_DAYS,
    TIME_SLOTS,
    formatDuration,
    minutesToTime,
} from "@/lib/config";

interface ExportOptions {
    /** Main heading printed at the top of the PDF. */
    title?: string;
    /** File name without the `.pdf` extension. */
    fileName?: string;
}

/**
 * Builds the weekly timetable as a landscape A4 PDF and triggers
 * the browser download.
 *
 * Layout:
 *   - title + rules summary
 *   - a 7-column table (Time | Saturday … Thursday)
 *   - a color legend for the class types
 *   - a footer with the generation timestamp
 */
export function exportScheduleToPdf(
    schedule: Schedule,
    options: ExportOptions = {},
): void {
    const { title = "Weekly School Schedule", fileName = "weekly-schedule" } = options;

    /* ---------------------------- Document ---------------------------- */
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = { top: 12, right: 12, bottom: 14, left: 12 };
    const contentWidth = pageWidth - margin.left - margin.right;

    /* ------------------------ Table body + lookup --------------------- */
    // `body` is what autoTable renders; `cellLookup` lets the hooks below
    // find which class sits in a given row/column so they can color it.
    const body: string[][] = [];
    const cellLookup = new Map<string, SchoolClass | null>();

    TIME_SLOTS.forEach((slot, rowIndex) => {
        // First column: period number + start/end time
        const row: string[] = [
            `Period ${slot.index + 1}\n${slot.start} – ${slot.end}`,
        ];

        SCHOOL_DAYS.forEach((day, dayIndex) => {
            const schoolClass = schedule[day][slot.index] ?? null;
            cellLookup.set(`${rowIndex}-${dayIndex}`, schoolClass);

            // Each class becomes a 3-line cell: type·group / place / teacher
            row.push(
                schoolClass
                    ? `${schoolClass.type} ${schoolClass.module} · ${schoolClass?.group ? schoolClass.group : ""}\n${schoolClass.place}\n${schoolClass.teacher}`
                    : "—",
            );
        });

        body.push(row);
    });

    /* ------------------------------ Header ---------------------------- */
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(title, margin.left, 16);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text(
        `${SCHOOL_DAYS[0]} – ${SCHOOL_DAYS[SCHOOL_DAYS.length - 1]}  ·  ` +
        `${minutesToTime(DAY_START_MINUTES)} – ${minutesToTime(DAY_END_MINUTES)}  ·  ` +
        `${formatDuration(CLASS_DURATION_MINUTES)} per class  ·  no breaks`,
        margin.left,
        22.5,
    );

    /* ------------------------------ Table ----------------------------- */
    autoTable(doc, {
        startY: 28,
        margin: { ...margin, bottom: 20 },
        theme: "grid",
        head: [["Time", ...SCHOOL_DAYS]],
        body,
        styles: {
            font: "helvetica",
            fontSize: 8,
            cellPadding: { top: 2.5, right: 2.5, bottom: 2.5, left: 4 },
            lineColor: [226, 232, 240], // slate-200
            lineWidth: 0.2,
            valign: "middle",
            overflow: "linebreak",
            textColor: [51, 65, 85], // slate-700
        },
        headStyles: {
            fillColor: [241, 245, 249], // slate-100
            textColor: [51, 65, 85],    // slate-700
            fontStyle: "bold",
            fontSize: 9,
            halign: "center",
            valign: "middle",
            minCellHeight: 9,
        },
        columnStyles: {
            // First column (times) is narrower and centered
            0: { cellWidth: 26, halign: "center" },
        },

        /**
         * Runs before each cell is painted: here we swap in the colors
         * that belong to the class type of that cell.
         */
        didParseCell: (data) => {
            if (data.section !== "body") return;

            // Time column
            if (data.column.index === 0) {
                data.cell.styles.fillColor = [248, 250, 252]; // slate-50
                data.cell.styles.textColor = [71, 85, 105];   // slate-600
                data.cell.styles.fontStyle = "bold";
                data.cell.styles.fontSize = 8;
                return;
            }

            const schoolClass = cellLookup.get(
                `${data.row.index}-${data.column.index - 1}`,
            );

            // Free period
            if (!schoolClass) {
                data.cell.styles.fillColor = [248, 250, 252]; // slate-50
                data.cell.styles.textColor = [148, 163, 184]; // slate-400
                data.cell.styles.halign = "center";
                return;
            }

            // Colored class cell
            const palette = CLASS_TYPE_STYLES[schoolClass.type].pdf;
            data.cell.styles.fillColor = palette.fill;
            data.cell.styles.lineColor = palette.border;
            data.cell.styles.textColor = palette.text;
        },

        /**
         * Runs after each cell is painted: adds a thin colored strip on the
         * left edge so the class type is still obvious in black & white print.
         */
        didDrawCell: (data) => {
            if (data.section !== "body" || data.column.index === 0) return;

            const schoolClass = cellLookup.get(
                `${data.row.index}-${data.column.index - 1}`,
            );
            if (!schoolClass) return;

            const palette = CLASS_TYPE_STYLES[schoolClass.type].pdf;
            doc.setFillColor(...palette.accent);
            doc.rect(data.cell.x, data.cell.y + 1.2, 1.4, data.cell.height - 2.4, "F");
        },
    });

    /* --------------------------- Legend + footer ---------------------- */
    // autoTable exposes the Y position where the table ended.
    const tableEndY = (
        doc as unknown as { lastAutoTable: { finalY: number } }
    ).lastAutoTable.finalY;

    // Move to a new page if the legend would not fit
    let cursorY = tableEndY + 9;
    if (cursorY + 26 > pageHeight - margin.bottom) {
        doc.addPage();
        cursorY = margin.top + 10;
    }

    // --- Legend title ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text("CLASS TYPES", margin.left, cursorY);
    cursorY += 6;

    // --- Legend items (wraps automatically) ---
    const boxSize = 3;
    const boxGap = 2;
    const itemGap = 8;
    let cursorX = margin.left;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);

    Object.entries(CLASS_TYPE_STYLES).forEach(([type, style]) => {
        const itemWidth = boxSize + boxGap + doc.getTextWidth(type);

        // Wrap to a new line when the row is full
        if (cursorX + itemWidth > pageWidth - margin.right) {
            cursorX = margin.left;
            cursorY += 7;
        }

        doc.setFillColor(...style.pdf.accent);
        doc.roundedRect(cursorX, cursorY - 2.6, boxSize, boxSize, 0.8, 0.8, "F");

        doc.setTextColor(71, 85, 105); // slate-600
        doc.text(type, cursorX + boxSize + boxGap, cursorY);

        cursorX += itemWidth + itemGap;
    });

    cursorY += 10;

    // --- Footer line: rules summary + generation date ---
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text(
        `${SCHOOL_DAYS.length} days  ·  ${TIME_SLOTS.length} periods per day  ·  ` +
        `${formatDuration(CLASS_DURATION_MINUTES)} per class  ·  no breaks`,
        margin.left,
        Math.min(cursorY, pageHeight - margin.bottom),
    );
    doc.text(
        `Generated ${new Date().toLocaleString()}`,
        pageWidth - margin.right,
        Math.min(cursorY, pageHeight - margin.bottom),
        { align: "right" },
    );

    /* ----------------------------- Download --------------------------- */
    const dateStamp = new Date().toISOString().slice(0, 10);
    doc.save(`${fileName}-${dateStamp}.pdf`);
}