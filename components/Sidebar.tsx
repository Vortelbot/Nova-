
import React from 'react';
import { User } from '../types';

interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
  isAdmin: boolean;
  user: User;
  onLogout: () => void;
  onOpenDeploy?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isAdmin, user, onLogout, onOpenDeploy }) => {
  const links = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  ];

  const adminLinks = [
    { id: 'admin-servers', label: 'Servers', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
    { id: 'admin-nodes', label: 'Nodes', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' },
    { id: 'admin-users', label: 'Users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { id: 'deployment-guide', label: 'Cloud Hosting', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' },
  ];

  return (
    <aside className="w-64 border-r border-white/5 flex flex-col h-full bg-[#08090f] p-6 shadow-2xl relative z-[50]">
      <div className="mb-12 flex items-center gap-4 px-2">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-600/20">N</div>
        <span className="font-black text-2xl tracking-tighter text-white block">NovaHost</span>
      </div>
      
      <nav className="flex-1 space-y-2">
        <button 
          onClick={onOpenDeploy}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all text-xs font-black uppercase tracking-widest bg-emerald-600/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-600 hover:text-white mb-6 animate-pulse"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
          Provision
        </button>

        {links.map(link => (
          <button
            key={link.id}
            onClick={() => setView(link.id)}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all text-xs font-black uppercase tracking-widest border ${
              currentView === link.id ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20' : 'border-transparent text-zinc-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={link.icon} /></svg>
            {link.label}
          </button>
        ))}

        {isAdmin && (
          <div className="pt-10 space-y-1.5">
            <div className="px-4 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-4">Management</div>
            {adminLinks.map(link => (
              <button
                key={link.id}
                onClick={() => setView(link.id)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all text-xs font-black uppercase tracking-widest border ${
                  currentView === link.id ? 'bg-zinc-800 text-white border-zinc-700' : 'border-transparent text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={link.icon} /></svg>
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group relative overflow-hidden cursor-pointer">
          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-[11px] font-black uppercase shadow-inner text-white">{user.username.substring(0,2)}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black truncate text-white">{user.username}</p>
            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{user.role}</p>
          </div>
          <button onClick={onLogout} className="absolute inset-0 bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-black uppercase text-white tracking-widest">Logout</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
