// lib/classTypeStyles.ts
import type { ClassType } from "@/types/schedule";

/**
 * RGB color palette used when drawing the timetable into a PDF.
 * jsPDF cannot understand Tailwind classes, so the colors are
 * duplicated here as plain [r, g, b] tuples.
 */
export interface PdfPalette {
  /** Light background of the cell. */
  fill: [number, number, number];
  /** Cell border. */
  border: [number, number, number];
  /** Main text color. */
  text: [number, number, number];
  /** Saturated color: legend dot + accent strip inside the cell. */
  accent: [number, number, number];
}

/**
 * Visual style of a class type.
 * - `card`  → background + border of the whole card (web)
 * - `badge` → the small pill showing the type name (web)
 * - `dot`   → the colored dot used in the legend (web)
 * - `pdf`   → the matching palette used by the PDF exporter
 */
export interface ClassTypeStyle {
  card: string;
  badge: string;
  dot: string;
  pdf: PdfPalette;
}

export const CLASS_TYPE_STYLES: Record<ClassType, ClassTypeStyle> = {
  Cours: {
    card: "border-blue-200 bg-blue-50",
    badge: "bg-blue-600 text-white",
    dot: "bg-blue-500",
    pdf: {
      fill: [239, 246, 255],   // blue-50
      border: [191, 219, 254], // blue-200
      text: [30, 58, 138],     // blue-900
      accent: [59, 130, 246],  // blue-500
    },
  },
  TD: {
    card: "border-emerald-200 bg-emerald-50",
    badge: "bg-emerald-600 text-white",
    dot: "bg-emerald-500",
    pdf: {
      fill: [236, 253, 245],   // emerald-50
      border: [167, 243, 208], // emerald-200
      text: [6, 78, 59],       // emerald-900
      accent: [16, 185, 129],  // emerald-500
    },
  },
  TP: {
    card: "border-amber-200 bg-amber-50",
    badge: "bg-amber-500 text-white",
    dot: "bg-amber-500",
    pdf: {
      fill: [255, 251, 235],   // amber-50
      border: [253, 230, 138], // amber-200
      text: [120, 53, 15],     // amber-900
      accent: [245, 158, 11],  // amber-500
    },
  },
  Exam: {
    card: "border-rose-200 bg-rose-50",
    badge: "bg-rose-600 text-white",
    dot: "bg-rose-500",
    pdf: {
      fill: [255, 241, 242],   // rose-50
      border: [254, 205, 211], // rose-200
      text: [136, 19, 55],     // rose-900
      accent: [244, 63, 94],   // rose-500
    },
  },
};