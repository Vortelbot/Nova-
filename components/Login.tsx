
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { users as initialUsers } from '../store/mockData';

interface LoginProps {
  onLogin: (user: User) => void;
  storageKey: string;
}

const Login: React.FC<LoginProps> = ({ onLogin, storageKey }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const [dbUsers, setDbUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : initialUsers;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(dbUsers));
  }, [dbUsers, storageKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isRegister) {
      if (dbUsers.find(u => u.username === username)) {
        return setError('Username already taken.');
      }
      const newUser: User = {
        id: `usr-${Math.floor(1000 + Math.random() * 9000)}`,
        username,
        password,
        email: email || `${username}@novahost.io`,
        role: 'user',
        createdAt: new Date().toISOString()
      };
      setDbUsers(prev => [...prev, newUser]);
      onLogin(newUser);
    } else {
      const found = dbUsers.find(u => u.username === username && u.password === password);
      if (found) {
        onLogin(found);
      } else {
        setError('Invalid credentials.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b10] flex items-center justify-center p-6">
      <div className="w-full max-w-sm animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-2xl text-white shadow-2xl shadow-blue-600/30 mb-5 border border-white/10">
            N
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Novahosting</h1>
          <p className="text-zinc-500 mt-1 text-[11px] font-bold uppercase tracking-widest">Bot Panel Access</p>
        </div>

        <div className="bg-[#11131f] border border-white/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/5 blur-[50px] rounded-full"></div>
          
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {error && <div className="p-3 bg-red-600/10 border border-red-600/20 text-red-500 text-[10px] font-bold rounded-lg text-center uppercase tracking-wider">{error}</div>}
            
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Identity</label>
              <input 
                required
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#0a0b10] border border-white/5 rounded-xl px-4 py-3 text-white font-medium outline-none focus:border-blue-500/50 transition-all text-sm placeholder:text-zinc-800"
                placeholder="Username"
              />
            </div>

            {isRegister && (
               <div className="space-y-1.5 animate-in slide-in-from-top-2">
                 <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest ml-1">E-Mail</label>
                 <input 
                   type="email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full bg-[#0a0b10] border border-white/5 rounded-xl px-4 py-3 text-white font-medium outline-none focus:border-blue-500/50 transition-all text-sm placeholder:text-zinc-800"
                   placeholder="mail@example.com"
                 />
               </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Security Key</label>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a0b10] border border-white/5 rounded-xl px-4 py-3 text-white font-medium outline-none focus:border-blue-500/50 transition-all text-sm placeholder:text-zinc-800"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold text-white transition-all shadow-xl shadow-blue-600/20 active:scale-95 mt-4 border border-white/10 text-[11px] uppercase tracking-widest"
            >
              {isRegister ? 'Initialize Account' : 'Authenticate'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsRegister(!isRegister)}
              className="text-[10px] font-bold text-zinc-600 hover:text-blue-500 uppercase tracking-widest transition-colors"
            >
              {isRegister ? 'Already have an account? Log in' : "Don't have an account? Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
