
import React from 'react';
import { Habit } from '../types';
import { Icons } from '../constants';

interface HabitTrackerProps {
  habits: Habit[];
  onToggleHabit: (id: string) => void;
}

const HabitTracker: React.FC<HabitTrackerProps> = ({ habits, onToggleHabit }) => {
  return (
    <div className="p-6 space-y-8 animate-fadeIn">
      <header>
        <h2 className="text-slate-400 text-sm font-medium">Daily Rituals</h2>
        <h1 className="text-3xl font-bold font-outfit text-slate-800">Habit Tracker</h1>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {habits.map((habit) => (
          <div 
            key={habit.id}
            onClick={() => onToggleHabit(habit.id)}
            className={`p-5 rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col items-center justify-center gap-3 ${
              habit.completedToday 
                ? 'bg-white border-indigo-500/20' 
                : 'bg-white border-transparent shadow-sm'
            }`}
          >
            {/* Background fill */}
            <div 
              className={`absolute inset-0 transition-opacity duration-500 ${habit.completedToday ? 'opacity-5' : 'opacity-0'}`} 
              style={{ backgroundColor: habit.color }}
            />
            
            <div 
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                habit.completedToday ? 'scale-110 shadow-lg' : 'opacity-50'
              }`}
              style={{ backgroundColor: habit.completedToday ? habit.color : '#f1f5f9', color: habit.completedToday ? 'white' : '#64748b' }}
            >
              <Icons.Check />
            </div>

            <div className="text-center">
              <h3 className={`text-sm font-bold font-outfit truncate ${habit.completedToday ? 'text-indigo-900' : 'text-slate-600'}`}>
                {habit.title}
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                🔥 {habit.streak} DAY STREAK
              </p>
            </div>

            {habit.completedToday && (
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            )}
          </div>
        ))}

        <button className="p-5 rounded-3xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-indigo-400 hover:text-indigo-400 transition-all">
          <Icons.Plus />
          <span className="text-xs font-bold font-outfit">New Habit</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-sm font-bold text-slate-800 mb-4">Weekly Snapshot</h3>
        <div className="flex justify-between gap-1">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${i < 4 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                {i < 4 ? '✓' : ''}
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;
