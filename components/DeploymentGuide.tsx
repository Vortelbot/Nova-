
import React from 'react';

const DeploymentGuide: React.FC = () => {
  const steps = [
    {
      title: 'Option A: Vercel (Quickest)',
      description: 'The easiest way to host this panel with SSL and global CDN.',
      commands: [
        'npm install -g vercel',
        'vercel'
      ],
      note: 'Make sure to add API_KEY to your Vercel Environment Variables.'
    },
    {
      title: 'Option B: Self-Hosted (VPS)',
      description: 'Host it on your own Linux server (Ubuntu/Debian) for full control.',
      commands: [
        'git clone https://your-repo/novahost.git',
        'cd novahost',
        'npm install',
        'npm run build',
        'sudo apt install nginx',
        'cp -r build/* /var/www/html/'
      ],
      note: 'Use PM2 if you decide to add a real Node.js backend later.'
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl font-black text-white tracking-tighter">Cloud Deployment Center</h1>
        <p className="text-zinc-600 text-[12px] uppercase font-black tracking-[0.6em] flex items-center gap-4">
          <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]"></span>
          Ready for Production Output
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {steps.map((step, idx) => (
          <div key={idx} className="glass rounded-[3rem] p-12 border border-white/5 space-y-8 flex flex-col h-full">
            <div className="space-y-3">
              <h2 className="text-2xl font-black text-white tracking-tight">{step.title}</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">{step.description}</p>
            </div>

            <div className="flex-1 space-y-4">
               <div className="bg-black/80 rounded-2xl p-6 border-2 border-zinc-900 font-mono text-xs overflow-x-auto">
                  {step.commands.map((cmd, cIdx) => (
                    <div key={cIdx} className="flex gap-4 mb-2 last:mb-0">
                      <span className="text-zinc-800 select-none">$</span>
                      <span className="text-blue-400">{cmd}</span>
                    </div>
                  ))}
               </div>
               <div className="flex gap-3 items-center p-4 bg-blue-600/5 rounded-xl border border-blue-500/10">
                  <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{step.note}</p>
               </div>
            </div>

            <button className="w-full py-4 rounded-2xl bg-white text-black text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95">
               Copy Command Sequence
            </button>
          </div>
        ))}
      </div>

      <div className="glass rounded-[3rem] p-12 border border-white/5">
        <h3 className="text-xl font-black text-white mb-6 tracking-tight">Production Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { t: 'SSL Encryption', d: 'Ensure HTTPS is active via Certbot or Provider.' },
             { t: 'API Key Security', d: 'Never hardcode your Gemini API Key in source.' },
             { t: 'Assets Build', d: 'Run "npm run build" for optimized static chunks.' }
           ].map((item, i) => (
             <div key={i} className="flex gap-5">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                   <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                   <h4 className="text-white font-black text-xs uppercase tracking-widest mb-1">{item.t}</h4>
                   <p className="text-zinc-600 text-[11px] font-medium leading-relaxed">{item.d}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default DeploymentGuide;
