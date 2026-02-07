
import React, { useState } from 'react';
import { Task } from '../types';
import { Icons, COLORS } from '../constants';

interface DashboardProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onAddTask: (title: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, onToggleTask, onAddTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      onAddTask(newTaskTitle);
      setNewTaskTitle('');
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'work': return 'bg-blue-100 text-blue-600';
      case 'health': return 'bg-pink-100 text-pink-600';
      case 'urgent': return 'bg-rose-100 text-rose-600';
      default: return 'bg-emerald-100 text-emerald-600';
    }
  };

  return (
    <div className="p-6 space-y-8 animate-fadeIn">
      {/* Header */}
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-slate-400 text-sm font-medium">Daily Focus</h2>
          <h1 className="text-3xl font-bold font-outfit text-slate-800">Hello, Planner!</h1>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
          <Icons.Journal size={28} />
        </div>
      </header>

      {/* Progress Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-indigo-100 text-sm mb-1 opacity-80">Your daily goal</p>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold font-outfit">{progress === 100 ? 'Day Complete! 🚀' : `${Math.round(progress)}% Task Completion`}</h3>
            <span className="text-sm bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">{completedCount}/{tasks.length}</span>
          </div>
          <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-white h-full transition-all duration-700 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        {/* Decorative circle */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      {/* Quick Add */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input 
          type="text" 
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="I need to..." 
          className="flex-1 bg-white border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
        />
        <button 
          type="submit"
          className="bg-indigo-600 text-white p-3 rounded-2xl shadow-md hover:bg-indigo-700 active:scale-90 transition-all"
        >
          <Icons.Plus />
        </button>
      </form>

      {/* Tasks List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold font-outfit text-slate-800 px-1">Upcoming</h3>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div 
              key={task.id}
              onClick={() => onToggleTask(task.id)}
              className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                task.completed 
                  ? 'bg-slate-50 border-slate-100 opacity-60' 
                  : 'bg-white border-white shadow-sm hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                task.completed ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-300'
              }`}>
                {task.completed && <Icons.Check />}
              </div>
              <div className="flex-1">
                <h4 className={`text-sm font-semibold transition-all ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                  {task.title}
                </h4>
                {task.time && (
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
                    {task.time}
                  </span>
                )}
              </div>
              <span className={`text-[10px] px-2 py-1 rounded-lg font-bold uppercase tracking-wider ${getCategoryColor(task.category)}`}>
                {task.category}
              </span>
            </div>
          ))}
          {tasks.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <p className="text-sm">No tasks for today yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
