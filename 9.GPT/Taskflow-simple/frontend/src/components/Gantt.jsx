import { useMemo } from 'react';

// Colors mapped by column name (normalized to lowercase)
const COLUMN_COLORS = {
  'todo': { bar: 'bg-gray-400', text: 'text-gray-600' },
  'doing': { bar: 'bg-blue-400', text: 'text-blue-600' },
  'done': { bar: 'bg-green-400', text: 'text-green-600' },
  'default': { bar: 'bg-blue-300', text: 'text-blue-500' }
};

export default function Gantt({ tasks, columns = [] }) {
  // Simple Gantt implementation
  // 1. Determine min start date and max end date to set timeline range.
  // 2. Render a timeline header (months/days).
  // 3. Render rows for each task.

  const columnMap = useMemo(() => {
    const map = {};
    columns.forEach(c => {
      map[c.id] = c.name.toLowerCase();
    });
    return map;
  }, [columns]);

  const { minDate, maxDate, daysTotal } = useMemo(() => {
    let minT = new Date('2025-01-01').getTime();
    let maxT = new Date('2026-12-31').getTime();

    const times = [];
    tasks.forEach(t => {
      if (t.startDate) times.push(new Date(t.startDate).getTime());
      if (t.endDate) times.push(new Date(t.endDate).getTime());
    });

    if (times.length > 0) {
      minT = Math.min(...times);
      maxT = Math.max(...times);
    }

    // Add some buffer
    minT -= 86400000 * 2; // -2 days
    maxT += 86400000 * 5; // +5 days

    const range = maxT - minT;
    const daysTotal = Math.ceil(range / (1000 * 60 * 60 * 24));

    return { minDate: minT, maxDate: maxT, daysTotal };
  }, [tasks]);

  const pxPerDay = 40;

  function getLeftWidth(t) {
    if (!t.startDate || !t.endDate) return { left: 0, width: 0 };
    const start = new Date(t.startDate).getTime();
    const end = new Date(t.endDate).getTime();

    if (isNaN(start) || isNaN(end)) return { left: 0, width: 0 };

    const offsetDay = (start - minDate) / (1000 * 60 * 60 * 24);
    const durDay = (end - start) / (1000 * 60 * 60 * 24) + 1; // inclusive

    return {
      left: offsetDay * pxPerDay,
      width: Math.max(durDay * pxPerDay, 20) // min width
    };
  }

  // Generate date headers
  const dateHeaders = useMemo(() => {
    const headers = [];
    for (let i = 0; i < daysTotal; i++) {
      const d = new Date(minDate + i * 86400000);
      headers.push({
        label: `${d.getMonth() + 1}/${d.getDate()}`,
        left: i * pxPerDay
      });
    }
    return headers;
  }, [minDate, daysTotal, pxPerDay]);

  if (tasks.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 bg-white rounded shadow">
        표시할 태스크가 없습니다. 리스트 뷰에서 날짜를 설정해주세요.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto bg-white rounded shadow border border-gray-200">
      <div className="relative" style={{ minWidth: daysTotal * pxPerDay, paddingBottom: 20 }}>
        {/* Header */}
        <div className="flex border-b border-gray-200 bg-gray-50 h-10 items-center select-none sticky top-0 z-10">
          {dateHeaders.map((dh, i) => (
            <div key={i} className="absolute border-r border-gray-200 text-xs text-gray-400 text-center"
              style={{ left: dh.left, width: pxPerDay, height: '100%', lineHeight: '40px' }}>
              {dh.label}
            </div>
          ))}
        </div>

        {/* Grid Background */}
        <div className="absolute top-10 bottom-0 left-0 right-0 z-0 pointer-events-none">
          {dateHeaders.map((dh, i) => (
            <div key={i} className="absolute border-r border-dashed border-gray-100 h-full"
              style={{ left: dh.left + pxPerDay }}></div>
          ))}
        </div>

        {/* Rows */}
        <div className="py-2 relative z-0">
          {tasks.map(task => {
            const { left, width } = getLeftWidth(task);
            const hasDates = !!(task.startDate && task.endDate);

            const colName = columnMap[task.columnId] || '';
            const color = COLUMN_COLORS[colName] || COLUMN_COLORS['default'];

            return (
              <div key={task.id} className="relative h-10 hover:bg-gray-50 flex items-center group mb-1">
                {/* Task Bar */}
                {hasDates && (
                  <div
                    className={`absolute h-6 rounded shadow-sm flex items-center px-2 whitespace-nowrap overflow-hidden text-white text-xs ${color.bar}`}
                    style={{ left, width }}
                    title={`${task.title} (${task.startDate} ~ ${task.endDate})`}
                  >
                    {task.title}
                  </div>
                )}
                {!hasDates && (
                  <div className="px-4 text-xs text-gray-400 italic">
                    {task.title} (날짜 미설정)
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
