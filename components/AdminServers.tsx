
import React from 'react';
import { Bot, BotStatus, User } from '../types';

interface AdminServersProps {
  bots: Bot[];
  users: User[];
  onManage: (id: string) => void;
  onToggleSuspend: (id: string) => void;
}

const AdminServers: React.FC<AdminServersProps> = ({ bots, users, onManage, onToggleSuspend }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">System Infrastructure</h1>
        <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-[0.4em] mt-1">Overview of all active containers</p>
      </div>

      <div className="glass rounded-[2rem] overflow-hidden border border-white/5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/5">
              <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Instance & Owner</th>
              <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Node</th>
              <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Resources</th>
              <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {bots.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center text-zinc-700 font-bold uppercase tracking-widest">No servers deployed on cluster</td>
              </tr>
            ) : (
              bots.map(bot => {
                const owner = users.find(u => u.id === bot.ownerId);
                return (
                  <tr key={bot.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 text-[10px] font-black">{bot.language.charAt(0).toUpperCase()}</div>
                        <div>
                          <p className="text-white font-black text-sm">{bot.name}</p>
                          <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Owner: <span className="text-blue-400">{owner?.username || 'Unknown'}</span></p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black border uppercase tracking-widest ${bot.isSuspended ? 'bg-red-500/10 border-red-500/30 text-red-500' : bot.status === BotStatus.RUNNING ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-zinc-800/50 border-white/5 text-zinc-500'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${bot.isSuspended ? 'bg-red-500' : bot.status === BotStatus.RUNNING ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-600'}`}></div>
                        {bot.isSuspended ? 'SUSPENDED' : bot.status}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">{bot.nodeId}</td>
                    <td className="px-8 py-6">
                      <p className="text-[11px] font-black text-white">{bot.maxMemory}MB <span className="text-zinc-600 mx-1">/</span> {bot.maxCpu}% CPU</p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button onClick={() => onToggleSuspend(bot.id)} className={`px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${bot.isSuspended ? 'bg-emerald-600/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-600 hover:text-white' : 'bg-red-600/10 border-red-500/30 text-red-400 hover:bg-red-600 hover:text-white'}`}>
                          {bot.isSuspended ? 'Unsuspend' : 'Suspend'}
                        </button>
                        <button onClick={() => onManage(bot.id)} className="bg-zinc-900 border border-white/5 hover:border-blue-500/50 hover:text-blue-400 px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">Manage</button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminServers;
