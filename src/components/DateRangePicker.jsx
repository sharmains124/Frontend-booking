import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}
function isSameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate();
}
function isBetween(d, start, end) {
  if (!d || !start || !end) return false;
  return d > start && d < end;
}

function MonthGrid({ year, month, checkIn, checkOut, hoverDate, onSelect, onHover, today }) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const rangeEnd = hoverDate && checkIn && !checkOut ? hoverDate : checkOut;

  // Mock prices matching screenshot
  const getPrice = (date) => {
    if (!date) return null;
    const day = date.getDate();
    // Some specific green prices from screenshot
    if (day === 21 || day === 23 || day === 27 || (month === 2 && day === 15)) return { val: (4500 + (day * 13) % 1000).toLocaleString(), color: 'text-emerald-500' };
    const base = 5000 + (day * 37) % 2000;
    return { val: base.toLocaleString(), color: 'text-gray-400' };
  };

  return (
    <div className="flex-1">
      <div className="text-center font-black text-gray-900 mb-6 text-[15px]">
        {MONTHS[month]} {year}
      </div>
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[12px] font-black text-gray-400 pb-2">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} className="h-14" />;
          const isToday  = isSameDay(date, today);
          const isStart  = isSameDay(date, checkIn);
          const isEnd    = isSameDay(date, checkOut);
          const inRange  = rangeEnd && checkIn && isBetween(date, checkIn, rangeEnd);
          const isPast   = date < today && !isToday;
          const price    = getPrice(date);

          return (
            <div
              key={date ? date.toISOString() : i}
              className={`relative flex flex-col items-center justify-center h-14 cursor-pointer select-none transition-all
                ${inRange ? 'bg-blue-50/50' : ''}
                ${isStart && inRange ? 'rounded-l-full' : ''}
                ${isEnd   && inRange ? 'rounded-r-full' : ''}`}
              onClick={() => !isPast && onSelect(date)}
              onMouseEnter={() => date && onHover(date)}
              onMouseLeave={() => onHover(null)}
            >
              <span className={`w-9 h-9 flex items-center justify-center rounded-full text-[15px] font-black transition-all z-10
                ${isPast ? 'text-gray-300 cursor-not-allowed font-medium' : 'hover:bg-blue-100'}
                ${isStart || isEnd ? 'border-[1.5px] border-blue-600 text-gray-800' : 'text-gray-800'}
                ${isToday && !isStart && !isEnd ? 'text-blue-600' : ''}`}
              >
                {date.getDate()}
              </span>

            </div>
          );
        })}
      </div>
    </div>
  );
}

const DateRangePicker = ({ checkIn, checkOut, onChange }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [hoverDate, setHoverDate] = useState(null);
  const [baseMonth, setBaseMonth] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selecting, setSelecting] = useState('checkin');

  const leftYear  = baseMonth.year;
  const leftMonth = baseMonth.month;
  const rightDate = new Date(leftYear, leftMonth + 1, 1);
  const rightYear  = rightDate.getFullYear();
  const rightMonth = rightDate.getMonth();

  const prevMonth = () => {
    const d = new Date(leftYear, leftMonth - 1, 1);
    setBaseMonth({ year: d.getFullYear(), month: d.getMonth() });
  };
  const nextMonth = () => {
    const d = new Date(leftYear, leftMonth + 1, 1);
    setBaseMonth({ year: d.getFullYear(), month: d.getMonth() });
  };

  const handleSelect = (date) => {
    if (selecting === 'checkin') {
      onChange({ checkIn: date, checkOut: null });
      setSelecting('checkout');
    } else {
      if (date < checkIn) {
        onChange({ checkIn: date, checkOut: checkIn });
      } else {
        onChange({ checkIn, checkOut: date });
      }
      setSelecting('checkin');
    }
  };

  return (
    <div className="bg-white rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.2)] border border-gray-100 p-6 w-[580px] font-black tracking-tight animate-in fade-in zoom-in duration-300">
      
      {/* Navigation and Grids */}
      <div className="relative">
        <div className="absolute top-[-2px] left-0 right-0 flex justify-between z-20 pointer-events-none">
           <button onClick={prevMonth} className="text-gray-300 hover:text-primary transition-all flex items-center justify-center bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm pointer-events-auto border border-gray-100">
             <ChevronLeft size={20} strokeWidth={3} />
           </button>
           <button onClick={nextMonth} className="text-primary hover:text-primary-dark transition-all flex items-center justify-center bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm pointer-events-auto border border-gray-100">
             <ChevronRight size={20} strokeWidth={3} />
           </button>
        </div>

        <div className="flex gap-10 items-start">
          <MonthGrid year={leftYear} month={leftMonth} checkIn={checkIn} checkOut={checkOut}
            hoverDate={hoverDate} onSelect={handleSelect} onHover={setHoverDate} today={today} />
          
          <div className="w-[1px] h-64 bg-gray-100 self-center" />

          <MonthGrid year={rightYear} month={rightMonth} checkIn={checkIn} checkOut={checkOut}
            hoverDate={hoverDate} onSelect={handleSelect} onHover={setHoverDate} today={today} />
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
