
import React, { useEffect, useRef, useState } from 'react';
import { LogEntry } from '../types';
import { analyzeLogs } from '../services/geminiService';

interface ConsoleProps {
  logs: LogEntry[];
  botName: string;
  onCommand?: (cmd: string) => void;
}

const Console: React.FC<ConsoleProps> = ({ logs, botName, onCommand }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      if (onCommand) onCommand(inputValue);
      setInputValue('');
    }
  };

  const handleAIAnalysis = async () => {
    if (logs.length === 0) return;
    setAnalyzing(true);
    const result = await analyzeLogs(logs.slice(-40).map(l => l.message));
    setAnalysisResult(result);
    setAnalyzing(false);
  };

  return (
    <div className="bg-[#020305] border border-white/10 rounded-[3rem] flex flex-col h-[800px] overflow-hidden shadow-2xl relative group">
      <div className="absolute inset-0 bg-blue-600/5 pointer-events-none opacity-20"></div>
      
      <div className="bg-[#080911] px-12 py-7 border-b border-white/5 flex items-center justify-between backdrop-blur-3xl relative z-10">
        <div className="flex items-center gap-8">
          <div className="flex gap-3">
            <div className="w-4 h-4 rounded-full bg-[#ff5f56] shadow-lg shadow-red-500/20"></div>
            <div className="w-4 h-4 rounded-full bg-[#ffbd2e] shadow-lg shadow-yellow-500/20"></div>
            <div className="w-4 h-4 rounded-full bg-[#27c93f] shadow-lg shadow-emerald-500/20"></div>
          </div>
          <span className="text-[12px] font-black font-mono text-zinc-600 uppercase tracking-[0.5em]">
            ssh <span className="text-zinc-800 mx-3">/</span> root@nova:~#
          </span>
        </div>
        <button 
          onClick={handleAIAnalysis}
          disabled={analyzing || logs.length === 0}
          className="flex items-center gap-4 px-8 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-blue-500 disabled:opacity-10 active:scale-95 shadow-2xl shadow-blue-600/30"
        >
          {analyzing ? (
            <div className="w-4 h-4 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          )}
          Deep Fix AI
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 p-12 font-mono text-sm leading-relaxed overflow-y-auto space-y-4 selection:bg-blue-600/40 scroll-smooth relative z-10 custom-scrollbar bg-black/60"
      >
        {logs.map((log, idx) => (
          <div key={idx} className="flex gap-8 group/line animate-in fade-in slide-in-from-left-2 duration-300">
            <span className="text-zinc-800 shrink-0 select-none font-black">[{log.timestamp}]</span>
            <span className={`
              ${log.type === 'error' ? 'text-red-500 font-black' : ''}
              ${log.type === 'warn' ? 'text-yellow-500 font-bold' : ''}
              ${log.type === 'info' ? 'text-zinc-300 font-medium' : ''}
              ${log.type === 'system' ? 'text-blue-400 italic font-black' : ''}
            `}>
              <span className="mr-4 text-zinc-900 opacity-60">::</span>{log.message}
            </span>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-zinc-800 select-none opacity-40">
             <div className="w-20 h-20 border-4 border-dashed border-zinc-900 rounded-full mb-8 animate-spin-slow"></div>
             <p className="text-[13px] font-black uppercase tracking-[0.8em]">Awaiting Nova Kernel</p>
          </div>
        )}
      </div>

      <div className="bg-[#05060a] p-8 px-12 flex items-center gap-8 border-t border-white/5 backdrop-blur-3xl relative z-10">
        <span className="text-blue-500 font-mono text-2xl font-black">❯</span>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleCommand}
          placeholder="Type bash command..." 
          className="bg-transparent border-none outline-none text-sm font-mono font-black flex-1 text-white placeholder:text-zinc-900 tracking-wider"
        />
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
      `}</style>
    </div>
  );
};

export default Console;
