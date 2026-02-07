
import React, { useState } from 'react';
import { CalendarEvent } from '../types';
import { Icons } from '../constants';

interface CalendarViewProps {
  events: CalendarEvent[];
  onAddEvent: (event: CalendarEvent) => void;
  onRemoveEvent: (id: string) => void;
}

const HOURS = Array.from({ length: 18 }, (_, i) => i + 6); // 6 AM to 11 PM

const CalendarView: React.FC<CalendarViewProps> = ({ events, onAddEvent, onRemoveEvent }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [selectedHour, setSelectedHour] = useState(9);

  const formatHour = (h: number) => {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 || 12;
    return `${displayHour} ${ampm}`;
  };

  const handleAdd = () => {
    if (newTitle.trim()) {
      onAddEvent({
        id: Date.now().toString(),
        title: newTitle,
        startHour: selectedHour,
        category: 'work'
      });
      setNewTitle('');
      setIsAdding(false);
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fadeIn pb-32">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-slate-400 text-sm font-medium">Daily Rhythm</h2>
          <h1 className="text-3xl font-bold font-outfit text-slate-800">Timeline</h1>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg active:scale-90 transition-all"
        >
          <Icons.Plus />
        </button>
      </header>

      {/* Add Event Modal-like Form */}
      {isAdding && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-5 space-y-4 animate-slideDown">
          <h3 className="font-bold font-outfit text-indigo-900">Block Time</h3>
          <div className="space-y-3">
            <input 
              autoFocus
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What are you doing?"
              className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none border-none shadow-sm"
            />
            <div className="flex gap-2 overflow-x-auto pb-1">
              {HOURS.map(h => (
                <button
                  key={h}
                  onClick={() => setSelectedHour(h)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                    selectedHour === h ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-indigo-400'
                  }`}
                >
                  {formatHour(h)}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleAdd}
                className="flex-1 bg-indigo-600 text-white font-bold py-2.5 rounded-xl text-xs active:scale-95 transition-all"
              >
                Save Event
              </button>
              <button 
                onClick={() => setIsAdding(false)}
                className="px-4 bg-white text-slate-400 font-bold py-2.5 rounded-xl text-xs active:scale-95 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Timeline Grid */}
      <div className="relative mt-4 space-y-0">
        {HOURS.map((hour) => {
          const hourEvents = events.filter(e => e.startHour === hour);
          
          return (
            <div key={hour} className="flex gap-4 min-h-[80px] group">
              {/* Hour Label */}
              <div className="w-14 pt-1 text-right">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider">
                  {formatHour(hour)}
                </span>
              </div>

              {/* Grid Line & Content */}
              <div className="flex-1 border-t border-slate-100 pt-3 pb-4 relative">
                {hourEvents.length > 0 ? (
                  <div className="space-y-2">
                    {hourEvents.map(event => (
                      <div 
                        key={event.id}
                        className="bg-white border-l-4 border-l-indigo-500 rounded-xl p-3 shadow-sm flex justify-between items-start group/card relative"
                      >
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">{event.title}</h4>
                          <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tight">Focus Block</span>
                        </div>
                        <button 
                          onClick={() => onRemoveEvent(event.id)}
                          className="opacity-0 group-hover/card:opacity-100 p-1 text-rose-300 hover:text-rose-500 transition-all"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div 
                    onClick={() => {
                      setSelectedHour(hour);
                      setIsAdding(true);
                    }}
                    className="h-full w-full rounded-xl hover:bg-slate-50 transition-colors cursor-pointer opacity-0 group-hover:opacity-100 flex items-center justify-center border-2 border-dashed border-transparent hover:border-slate-100"
                  >
                    <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Available</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
