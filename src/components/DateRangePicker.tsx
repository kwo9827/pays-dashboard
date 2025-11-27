import { useRef, useState, useEffect } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface Props {
  range: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
}

export default function DateRangePicker({ range, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 바깥 클릭하면 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const label =
    range?.from && range?.to
      ? `${format(range.from, "yyyy-MM-dd")} ~ ${format(range.to, "yyyy-MM-dd")}`
      : "날짜 선택";

  return (
    <div className="relative inline-block" ref={ref}>
      {/* 날짜 표시 버튼 */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded border bg-white px-4 py-2 text-sm shadow-sm"
      >
        {label}
      </button>

      {/* 팝업 달력 */}
      {open && (
        <div className="absolute z-50 mt-2 rounded border bg-white p-4 shadow-lg">
          <DayPicker mode="range" selected={range} onSelect={onChange} numberOfMonths={2} />
        </div>
      )}
    </div>
  );
}
