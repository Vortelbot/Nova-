
import React, { useState } from 'react';
import { Bot, VirtualFile } from '../types';
import { generateCode } from '../services/geminiService';

interface ServerAIProps {
  bot: Bot;
  onUpdateBot: (bot: Bot) => void;
}

const ServerAI: React.FC<ServerAIProps> = ({ bot, onUpdateBot }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    
    // Find the main file
    const mainFile = bot.files[0];
    const code = await generateCode(prompt, bot.language, mainFile?.content || "");
    
    if (code) {
      setGeneratedCode(code);
    }
    setLoading(false);
  };

  const applyCode = () => {
    if (!generatedCode) return;
    
    // We assume the first file is the entry point for simplicity
    const updatedFiles = bot.files.map((f, i) => i === 0 ? { ...f, content: generatedCode } : f);
    onUpdateBot({ ...bot, files: updatedFiles });
    setGeneratedCode(null);
    setPrompt('');
    alert("Code successfully applied to entrypoint file!");
  };

  return (
    <div className="space-y-12 animate-in zoom-in-95 duration-500">
      <div className="glass rounded-[3.5rem] p-14 border border-blue-500/10 shadow-[0_0_100px_-20px_rgba(59,130,246,0.25)] relative overflow-hidden min-h-[600px] flex flex-col">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 blur-[100px] rounded-full"></div>
        
        <div className="relative z-10 mb-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center border-2 border-blue-500/30 shadow-lg">
               <svg className="w-8 h-8 text-blue-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div>
              <h2 className="text-4xl font-black text-white tracking-tighter">Nova AI Copilot</h2>
              <p className="text-zinc-600 text-[11px] font-black uppercase tracking-[0.5em] mt-2">Neural Code Synthesis Engine v3.1</p>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-10 relative z-10">
          {!generatedCode ? (
            <div className="space-y-8">
              <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl font-medium">
                Describe the logic you want to implement. Our neural engine will analyze your existing infrastructure and synthesize a production-ready update.
              </p>
              <div className="relative group">
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Z.B.: Create a command handler with latency check..."
                  className="w-full bg-zinc-950/90 border-4 border-zinc-900 rounded-[2.5rem] p-10 text-white text-lg outline-none focus:border-blue-500/50 transition-all min-h-[200px] font-bold placeholder:text-zinc-900 shadow-2xl"
                />
                <button 
                  onClick={handleGenerate}
                  disabled={loading || !prompt.trim()}
                  className="absolute bottom-10 right-10 bg-blue-600 hover:bg-blue-500 disabled:opacity-20 px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-white transition-all shadow-2xl shadow-blue-600/40 active:scale-95 border border-white/10"
                >
                  {loading ? 'Synthesizing Architecture...' : 'Analyze & Generate'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-500">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-blue-500 text-[12px] font-black uppercase tracking-[0.5em]">Proposed Logic Refactor</h3>
                <div className="flex gap-6">
                  <button onClick={() => setGeneratedCode(null)} className="text-zinc-600 hover:text-white text-[12px] font-black uppercase tracking-widest transition-colors">Discard</button>
                  <button onClick={applyCode} className="bg-emerald-600 hover:bg-emerald-500 px-8 py-4 rounded-2xl text-[12px] font-black uppercase tracking-widest text-white shadow-2xl shadow-emerald-600/30 transition-all border border-white/10">Apply to Instance</button>
                </div>
              </div>
              <div className="bg-black/90 rounded-[3rem] border-4 border-zinc-900 overflow-hidden shadow-2xl">
                 <div className="px-10 py-5 border-b-2 border-zinc-900 bg-zinc-950 flex items-center justify-between">
                    <span className="text-[12px] font-mono text-zinc-500 uppercase font-black tracking-widest">Buffer: main.js</span>
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                 </div>
                 <pre className="p-10 text-base font-mono text-zinc-300 overflow-x-auto selection:bg-blue-600/40 leading-relaxed max-h-[500px]">
                    <code>{generatedCode}</code>
                 </pre>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-14 pt-8 border-t border-white/5 flex items-center justify-center opacity-30">
           <p className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.8em]">NovaOS Core Integration</p>
        </div>
      </div>
    </div>
  );
};

export default ServerAI;
