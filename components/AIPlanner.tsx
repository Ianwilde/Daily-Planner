
import React, { useState } from 'react';
import { Task, AIPlanResponse } from '../types';
import { getSmartSchedule } from '../services/geminiService';
import { Icons } from '../constants';

interface AIPlannerProps {
  tasks: Task[];
}

const AIPlanner: React.FC<AIPlannerProps> = ({ tasks }) => {
  const [brainDump, setBrainDump] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIPlanResponse | null>(null);

  const handleOptimize = async () => {
    if (!brainDump.trim() && tasks.length === 0) return;
    
    setLoading(true);
    const existingStr = tasks.map(t => t.title).join(', ');
    const res = await getSmartSchedule(brainDump, existingStr);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-8 animate-fadeIn">
      <header>
        <h2 className="text-slate-400 text-sm font-medium">Zen AI Coach</h2>
        <h1 className="text-3xl font-bold font-outfit text-slate-800">Optimize My Day</h1>
      </header>

      {!result && !loading ? (
        <div className="space-y-6">
          <div className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100">
            <h3 className="text-indigo-800 font-bold mb-2 font-outfit">Brain Dump</h3>
            <p className="text-indigo-600/70 text-xs mb-4">Tell me what's on your mind—errands, worries, or big goals. I'll turn it into a calm, effective schedule.</p>
            <textarea 
              value={brainDump}
              onChange={(e) => setBrainDump(e.target.value)}
              placeholder="e.g. I need to pick up dry cleaning, finish the report by 3pm, and I really want to go for a run but I feel tired..."
              className="w-full bg-white rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500 min-h-[150px] resize-none border-none shadow-sm"
            />
          </div>
          <button 
            onClick={handleOptimize}
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-200 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Icons.Coach />
            <span>Generate Smart Schedule</span>
          </button>
        </div>
      ) : result && !loading ? (
        <div className="space-y-6 animate-slideUp">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <p className="text-sm italic text-indigo-600 font-medium mb-4">"{result.motivationalQuote}"</p>
            <p className="text-slate-600 text-sm leading-relaxed">{result.summary}</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold font-outfit text-slate-800 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-500 rounded-full inline-block"></span>
              Your Optimized Path
            </h3>
            <div className="space-y-3">
              {result.recommendedSchedule.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start relative pl-4">
                  {/* Timeline line */}
                  {idx !== result.recommendedSchedule.length - 1 && (
                    <div className="absolute left-[19px] top-6 bottom-[-16px] w-0.5 bg-slate-100"></div>
                  )}
                  
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 mt-2 z-10"></div>
                  
                  <div className="flex-1 bg-white p-4 rounded-2xl border border-slate-50 shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{item.time}</span>
                      <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold">{item.duration}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-800">{item.activity}</h4>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setResult(null)}
            className="w-full bg-slate-100 text-slate-500 font-bold py-4 rounded-2xl active:scale-95 transition-all"
          >
            Start Over
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
               <Icons.Coach />
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-slate-800">Zen AI is Thinking...</h3>
            <p className="text-slate-400 text-xs mt-1 italic">Crafting your perfect day</p>
          </div>
          <div className="w-48 bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full animate-pulse-slow w-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPlanner;
