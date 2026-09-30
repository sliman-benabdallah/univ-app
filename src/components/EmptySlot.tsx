// components/EmptySlot.tsx

/**
 * Rendered when a period has no class (entry is `null`).
 * Useful if you later decide to leave a slot free.
 */
export default function EmptySlot() {
  return (
    <div className="flex w-full h-full min-h-[96px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/60">
      <span className="text-xs font-medium text-slate-900">Free</span>
    </div>
  );
}