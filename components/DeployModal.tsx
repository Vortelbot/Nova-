
import React, { useState, useMemo } from 'react';
import { Node, Bot, BotStatus, SupportedLanguage } from '../types';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeploy: (bot: Bot) => void;
  nodes: Node[];
  bots: Bot[];
  userId: string;
}

const DeployModal: React.FC<DeployModalProps> = ({ isOpen, onClose, onDeploy, nodes, bots, userId }) => {
  const [name, setName] = useState('');
  const [nodeId, setNodeId] = useState(nodes[0]?.id || '');
  const [ram, setRam] = useState(512);
  const [cpu, setCpu] = useState(50);
  const [disk, setDisk] = useState(1024);
  const [lang, setLang] = useState<SupportedLanguage>('javascript');
  const [error, setError] = useState('');

  const selectedNode = useMemo(() => nodes.find(n => n.id === nodeId), [nodeId, nodes]);

  const stats = useMemo(() => {
    if (!selectedNode) return { allocatedRam: 0 };
    const nodeBots = bots.filter(b => b.nodeId === selectedNode.id);
    return {
      allocatedRam: nodeBots.reduce((sum, b) => sum + b.maxMemory, 0),
    };
  }, [selectedNode, bots]);

  if (!isOpen) return null;

  const getInitialFile = (l: SupportedLanguage) => {
    switch(l) {
      case 'python': return { name: 'main.py', content: '# Python Application\nprint("Nova Engine Started")' };
      case 'java': return { name: 'Main.java', content: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Java Engine Started");\n  }\n}' };
      case 'rust': return { name: 'main.rs', content: 'fn main() {\n    println!("Rust Engine Started");\n}' };
      case 'go': return { name: 'main.go', content: 'package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Go Engine Started")\n}' };
      case 'cpp': return { name: 'main.cpp', content: '#include <iostream>\nint main() {\n    std::cout << "C++ Engine Started" << std::endl;\n    return 0;\n}' };
      case 'ruby': return { name: 'main.rb', content: 'puts "Ruby Engine Started"' };
      case 'php': return { name: 'index.php', content: '<?php\necho "PHP Engine Started";\n?>' };
      case 'typescript': return { name: 'index.ts', content: 'const message: string = "TypeScript Engine Started";\nconsole.log(message);' };
      default: return { name: 'index.js', content: '// JavaScript Application\nconsole.log("Nova Engine Started");' };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNode) return;
    if (ram < 128) return setError('Minimum RAM is 128MB');
    
    const remainingRam = selectedNode.totalRam - stats.allocatedRam;
    if (ram > remainingRam) return setError(`Insufficient capacity on this node.`);

    const newBot: Bot = {
      id: `nb-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name || 'New Instance',
      description: 'Newly deployed Discord bot.',
      status: BotStatus.OFFLINE,
      memoryUsage: 0,
      cpuUsage: 0,
      diskUsage: 0,
      maxMemory: ram,
      maxCpu: cpu,
      maxDisk: disk,
      lastStarted: '',
      nodeId: nodeId,
      language: lang,
      uptime: 0,
      ownerId: userId,
      files: [getInitialFile(lang)]
    };

    onDeploy(newBot);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#11131f] border-2 border-white/10 rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-400">
        <div className="px-10 py-8 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tighter">Initialize Server</h2>
            <p className="text-zinc-500 text-[11px] uppercase font-black tracking-widest mt-2">Resource allocation & Environment</p>
          </div>
          <button onClick={onClose} className="w-12 h-12 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white transition-all bg-white/5">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-10 space-y-10">
          {error && <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-2xl text-xs font-black text-center uppercase tracking-widest">{error}</div>}

          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-2">Display Identification</label>
              <input 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0a0b10] border-2 border-white/5 rounded-2xl px-6 py-4 text-base text-white font-black outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-900"
                placeholder="PROD-BOT-INSTANCE"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-2">Language Core</label>
                <select 
                  value={lang}
                  onChange={(e) => setLang(e.target.value as SupportedLanguage)}
                  className="w-full bg-[#0a0b10] border-2 border-white/5 rounded-2xl px-6 py-4 text-sm font-black text-white outline-none cursor-pointer hover:border-blue-500/30 transition-all"
                >
                  <option value="javascript">Node.js (JS)</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python 3.x</option>
                  <option value="java">Java 21</option>
                  <option value="rust">Rust / Cargo</option>
                  <option value="go">Go / Golang</option>
                  <option value="cpp">C++ / GCC</option>
                  <option value="ruby">Ruby / Gems</option>
                  <option value="php">PHP 8.3</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-2">Node Selection</label>
                <select 
                  value={nodeId}
                  onChange={(e) => setNodeId(e.target.value)}
                  className="w-full bg-[#0a0b10] border-2 border-white/5 rounded-2xl px-6 py-4 text-sm font-black text-white outline-none cursor-pointer hover:border-blue-500/30 transition-all"
                >
                  {nodes.map(n => (
                    <option key={n.id} value={n.id}>{n.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-white/5">
              <label className="text-[12px] font-black text-zinc-500 uppercase tracking-[0.4em] block text-center">Compute & Memory Plan</label>
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block text-center">RAM (MB)</span>
                  <input type="number" value={ram} onChange={e => setRam(Number(e.target.value))} className="w-full bg-[#0a0b10] border-2 border-white/5 rounded-xl px-4 py-3 text-center text-sm text-white font-black outline-none focus:border-blue-500/50" />
                </div>
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block text-center">CPU (%)</span>
                  <input type="number" value={cpu} onChange={e => setCpu(Number(e.target.value))} className="w-full bg-[#0a0b10] border-2 border-white/5 rounded-xl px-4 py-3 text-center text-sm text-white font-black outline-none focus:border-blue-500/50" />
                </div>
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block text-center">DISK (MB)</span>
                  <input type="number" value={disk} onChange={e => setDisk(Number(e.target.value))} className="w-full bg-[#0a0b10] border-2 border-white/5 rounded-xl px-4 py-3 text-center text-sm text-white font-black outline-none focus:border-blue-500/50" />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-6 rounded-2xl font-black text-white text-base transition-all shadow-2xl shadow-blue-600/40 active:scale-95 border border-white/10 uppercase tracking-[0.3em]">
            Provision Container
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeployModal;
