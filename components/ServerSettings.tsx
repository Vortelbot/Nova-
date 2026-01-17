
import React from 'react';
import { Bot } from '../types';

interface ServerSettingsProps {
  bot: Bot;
  onUpdateBot: (bot: Bot) => void;
}

const ServerSettings: React.FC<ServerSettingsProps> = ({ bot, onUpdateBot }) => {
  const toggleAI = () => {
    onUpdateBot({ ...bot, aiEnabled: !bot.aiEnabled });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="glass rounded-[2rem] p-10 border border-white/5 space-y-10">
        <div>
          <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Configuration Settings</h2>
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em]">Fine-tune your server parameters</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl group transition-all hover:border-blue-500/30">
            <div>
              <h3 className="text-white font-black text-base mb-1 flex items-center gap-3">
                Nova AI Copilot
                <span className="bg-blue-600 text-[8px] px-2 py-0.5 rounded font-black uppercase tracking-widest">Experimental</span>
              </h3>
              <p className="text-zinc-600 text-xs">Enable the AI coding assistant to automatically generate and write code for your instance.</p>
            </div>
            <button 
              onClick={toggleAI}
              className={`w-14 h-7 rounded-full transition-all relative ${bot.aiEnabled ? 'bg-blue-600' : 'bg-zinc-800'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${bot.aiEnabled ? 'left-8' : 'left-1'}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Instance Display Name</label>
              <input 
                value={bot.name}
                onChange={(e) => onUpdateBot({ ...bot, name: e.target.value })}
                className="w-full bg-zinc-950 border border-white/5 rounded-xl px-5 py-3 text-sm font-bold text-white outline-none focus:border-blue-500/50 transition-all"
              />
            </div>
             <div className="space-y-3">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Runtime Environment</label>
              <div className="w-full bg-zinc-950 border border-white/5 rounded-xl px-5 py-3 text-sm font-bold text-zinc-500 opacity-50">
                 {bot.language.toUpperCase()} ENGINE
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5">
           <button className="bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
              Reinstall Instance
           </button>
        </div>
      </div>
    </div>
  );
};

export default ServerSettings;
