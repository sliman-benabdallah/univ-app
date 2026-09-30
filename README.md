## Exporting the schedule

Click **Download PDF** in the header to export the whole week as a
landscape A4 PDF. The file contains:

- the full Saturday → Thursday grid with every class
- the color legend for the class types
- the timing rules and a generation timestamp

The PDF is produced entirely in the browser (`jspdf` + `jspdf-autotable`),
which is imported **only when the button is clicked**, so it does not
affect the initial page load.

To change the exported file name, pass the `fileName` prop:

```tsx
<DownloadPdfButton schedule={WEEKLY_SCHEDULE} fileName="fall-2026-schedule" />