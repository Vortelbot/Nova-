
import React from 'react';
import { User } from '../types';

interface AdminUsersProps {
  users: User[];
  onToggleSuspend: (id: string) => void;
  currentUser: User;
}

const AdminUsers: React.FC<AdminUsersProps> = ({ users, onToggleSuspend, currentUser }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Identity Management</h1>
        <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-[0.4em] mt-1">Platform Users & Access Control</p>
      </div>

      <div className="glass rounded-[2rem] overflow-hidden border border-white/5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/5">
              <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Username</th>
              <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Email</th>
              <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Role</th>
              <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-white text-[10px] font-black">
                      {u.username.substring(0,2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                         <p className="text-white font-black text-sm">{u.username}</p>
                         {u.id === currentUser.id && <span className="text-[8px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-black uppercase">You</span>}
                      </div>
                      <p className="text-[10px] text-zinc-600 font-mono">{u.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                   <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black border uppercase tracking-widest ${u.isSuspended ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
                      {u.isSuspended ? 'SUSPENDED' : 'ACTIVE'}
                   </div>
                </td>
                <td className="px-8 py-6 text-zinc-400 text-xs font-medium">{u.email}</td>
                <td className="px-8 py-6">
                   <span className={`text-[10px] font-black uppercase tracking-widest ${u.role === 'admin' ? 'text-blue-500' : 'text-zinc-600'}`}>
                      {u.role}
                   </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button 
                    onClick={() => onToggleSuspend(u.id)}
                    disabled={u.id === currentUser.id || u.id === 'user-admin'}
                    className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border disabled:opacity-30 disabled:cursor-not-allowed ${u.isSuspended ? 'bg-emerald-600/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-600 hover:text-white' : 'bg-red-600/10 border-red-500/30 text-red-400 hover:bg-red-600 hover:text-white'}`}
                  >
                    {u.isSuspended ? 'Unsuspend User' : 'Suspend User'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
