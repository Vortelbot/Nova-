
import React from 'react';
import { Node, Bot } from '../types';

interface AdminNodesProps {
  nodes: Node[];
  bots: Bot[];
}

const AdminNodes: React.FC<AdminNodesProps> = ({ nodes, bots }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Compute Nodes</h1>
        <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-[0.4em] mt-1">Global Hardware Fleet Monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {nodes.map(node => {
          const nodeBots = bots.filter(b => b.nodeId === node.id);
          const allocatedRam = nodeBots.reduce((sum, b) => sum + b.maxMemory, 0);
          const ramUsagePercent = (allocatedRam / node.totalRam) * 100;

          return (
            <div key={node.id} className="glass rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-all">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-white font-black text-lg tracking-tight">{node.name}</h3>
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-1">{node.ip}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${node.status === 'online' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                  {node.status}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    <span>RAM Allocation</span>
                    <span className={ramUsagePercent > 90 ? 'text-red-500' : 'text-zinc-400'}>{Math.round(ramUsagePercent)}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-1000 ${ramUsagePercent > 90 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${ramUsagePercent}%` }}></div>
                  </div>
                  <p className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">{allocatedRam}MB / {node.totalRam}MB</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                   <div>
                      <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">Active Containers</p>
                      <p className="text-lg font-black text-white">{nodeBots.length}</p>
                   </div>
                   <div>
                      <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">Compute Capacity</p>
                      <p className="text-lg font-black text-white">{(node.totalCpu / 100).toFixed(0)} vCores</p>
                   </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3 text-zinc-700 text-[9px] font-black uppercase tracking-[0.3em]">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {node.location}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminNodes;
