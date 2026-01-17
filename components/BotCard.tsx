
import React from 'react';
import { Bot, BotStatus } from '../types';

interface BotCardProps {
  bot: Bot;
  onClick: (bot: Bot) => void;
}

const BotCard: React.FC<BotCardProps> = ({ bot, onClick }) => {
  const getStatusColor = (status: BotStatus) => {
    if (bot.isSuspended) return 'text-red-400 border-red-500/40 bg-red-500/5 shadow-[0_0_20px_rgba(239,68,68,0.1)]';
    switch (status) {
      case BotStatus.RUNNING: return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]';
      case BotStatus.OFFLINE: return 'text-zinc-500 border-white/10 bg-white/5';
      case BotStatus.STARTING: return 'text-blue-400 border-blue-500/40 bg-blue-500/5 animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.1)]';
      default: return 'text-zinc-400 border-white/10 bg-white/5';
    }
  };

  const getUsageColor = (val: number, max: number) => {
    const percent = (val / max) * 100;
    if (percent > 90) return 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]';
    if (percent > 70) return 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]';
    return 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]';
  };

  return (
    <div 
      onClick={() => onClick(bot)}
      className="group bg-[#0d0f17] border border-white/5 hover:border-blue-500/40 rounded-[3rem] p-10 cursor-pointer transition-all hover:-translate-y-3 hover:shadow-[0_60px_120px_rgba(0,0,0,0.6)] relative overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 w-56 h-56 bg-blue-600/5 blur-[80px] rounded-full group-hover:bg-blue-600/15 transition-all duration-700"></div>
      
      <div className="flex items-start justify-between mb-12">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-all shadow-inner overflow-hidden">
             <span className="text-[12px] font-black text-blue-500 uppercase tracking-tighter">{bot.language.substring(0,2)}</span>
          </div>
          <div>
            <h3 className="font-black text-white group-hover:text-blue-400 transition-colors text-2xl tracking-tighter">{bot.name}</h3>
            <p className="text-[11px] text-zinc-600 font-mono uppercase tracking-widest mt-2 opacity-60">{bot.nodeId}</p>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-xl text-[10px] font-black border uppercase tracking-[0.3em] transition-all ${getStatusColor(bot.status)}`}>
          {bot.isSuspended ? 'SUSPENDED' : bot.status}
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-zinc-600">
            <span>CPU Load</span>
            <span className="text-zinc-400">{bot.cpuUsage}%</span>
          </div>
          <div className="h-2.5 bg-white/[0.03] rounded-full overflow-hidden border border-white/5">
            <div className={`h-full transition-all duration-1000 ${getUsageColor(bot.cpuUsage, bot.maxCpu)}`} style={{ width: `${Math.min(100, (bot.cpuUsage / bot.maxCpu) * 100)}%` }} />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-zinc-600">
            <span>Memory Load</span>
            <span className="text-zinc-400">{bot.memoryUsage.toFixed(0)} MB</span>
          </div>
          <div className="h-2.5 bg-white/[0.03] rounded-full overflow-hidden border border-white/5">
            <div className={`h-full transition-all duration-1000 ${getUsageColor(bot.memoryUsage, bot.maxMemory)}`} style={{ width: `${Math.min(100, (bot.memoryUsage / bot.maxMemory) * 100)}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className={`w-3 h-3 rounded-full ${bot.status === BotStatus.RUNNING ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.7)] animate-pulse' : 'bg-zinc-800'}`}></div>
          <span className="text-[11px] font-black text-zinc-700 uppercase tracking-[0.4em]">45.13.252.11</span>
        </div>
        <div className="text-[11px] font-black text-blue-600 uppercase tracking-widest group-hover:text-blue-400 transition-colors group-hover:translate-x-1 transition-transform">Access Console →</div>
      </div>
    </div>
  );
};

export default BotCard;
