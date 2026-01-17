
import React, { useState } from 'react';
import { VirtualFile } from '../types';

interface FileManagerProps {
  files: VirtualFile[];
  onUpdateFiles: (files: VirtualFile[]) => void;
}

const FileManager: React.FC<FileManagerProps> = ({ files, onUpdateFiles }) => {
  const [editingFile, setEditingFile] = useState<VirtualFile | null>(null);
  const [newFileName, setNewFileName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const handleDelete = (name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      onUpdateFiles(files.filter(f => f.name !== name));
    }
  };

  const handleSave = () => {
    if (editingFile) {
      onUpdateFiles(files.map(f => f.name === editingFile.name ? editingFile : f));
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 3000);
    }
  };

  const getDefaultContent = (ext: string) => {
    switch(ext) {
      case 'py': return '# Python file\nprint("Hello World")';
      case 'java': return 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}';
      case 'rs': return 'fn main() {\n    println!("Hello World");\n}';
      case 'go': return 'package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello World")\n}';
      case 'cpp': return '#include <iostream>\nint main() {\n    std::cout << "Hello World" << std::endl;\n    return 0;\n}';
      case 'rb': return 'puts "Hello World"';
      case 'php': return '<?php\necho "Hello World";\n?>';
      case 'ts': return 'const msg: string = "Hello World";\nconsole.log(msg);';
      default: return '// Application file\nconsole.log("Hello World");';
    }
  };

  const handleCreate = () => {
    if (newFileName && !files.find(f => f.name === newFileName)) {
      const extension = newFileName.split('.').pop() || '';
      const newFile = { name: newFileName, content: getDefaultContent(extension) };
      onUpdateFiles([...files, newFile]);
      setNewFileName('');
      setIsCreating(false);
      setEditingFile(newFile);
    }
  };

  if (editingFile) {
    return (
      <div className="bg-zinc-950 border-2 border-zinc-900 rounded-[3.5rem] p-10 flex flex-col h-[750px] shadow-3xl animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center border border-white/10 shadow-lg">
               <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </div>
            <div>
              <h3 className="text-white font-black text-2xl tracking-tighter">{editingFile.name}</h3>
              {justSaved ? (
                <p className="text-emerald-500 text-[11px] font-black uppercase tracking-widest mt-1.5 animate-pulse">Changes committed to disk</p>
              ) : (
                <p className="text-zinc-600 text-[11px] font-black uppercase tracking-widest mt-1.5">Runtime Source Buffer</p>
              )}
            </div>
          </div>
          <div className="flex gap-6">
            <button 
              onClick={() => setEditingFile(null)}
              className="px-6 py-3.5 text-xs font-black text-zinc-500 hover:text-white transition-all uppercase tracking-widest"
            >
              Discard & Close
            </button>
            <button 
              onClick={handleSave}
              className={`px-10 py-3.5 text-xs font-black rounded-xl transition-all shadow-2xl border border-white/10 ${justSaved ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
            >
              {justSaved ? 'Saved' : 'Commit Changes'}
            </button>
          </div>
        </div>
        <div className="flex-1 relative">
          <textarea
            autoFocus
            spellCheck={false}
            value={editingFile.content}
            onChange={(e) => {
              setEditingFile({ ...editingFile, content: e.target.value });
              setJustSaved(false);
            }}
            className="w-full h-full bg-zinc-900/40 text-zinc-200 p-10 font-mono text-base border-4 border-zinc-900 rounded-[2.5rem] outline-none focus:border-blue-500/30 transition-all resize-none shadow-inner leading-relaxed"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/10 border-2 border-zinc-900 rounded-[3.5rem] overflow-hidden min-h-[500px] shadow-2xl backdrop-blur-md">
      <div className="px-12 py-10 border-b-2 border-zinc-900 flex justify-between items-center bg-zinc-950/20">
        <h2 className="text-3xl font-black text-white flex items-center gap-6">
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          Filesystem Explorer
        </h2>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-zinc-900 border-2 border-zinc-800 hover:bg-zinc-800 text-white px-8 py-3 rounded-2xl text-xs font-black tracking-widest uppercase transition-all shadow-lg"
        >
          Add Resource
        </button>
      </div>

      <div className="divide-y-2 divide-zinc-900">
        {isCreating && (
          <div className="px-12 py-8 flex gap-8 items-center bg-blue-600/5 animate-in slide-in-from-top-4 duration-300">
            <input 
              autoFocus
              placeholder="filename.ext"
              className="bg-zinc-950 border-4 border-zinc-900 rounded-2xl px-6 py-3 text-base outline-none text-white flex-1 focus:border-blue-500 transition-all font-black placeholder:text-zinc-900"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
            <div className="flex gap-6">
              <button onClick={handleCreate} className="text-blue-500 text-xs font-black uppercase tracking-widest">Create</button>
              <button onClick={() => setIsCreating(false)} className="text-zinc-600 text-xs font-black uppercase tracking-widest">Cancel</button>
            </div>
          </div>
        )}

        {files.map((file) => (
          <div key={file.name} className="px-12 py-8 flex items-center justify-between hover:bg-white/[0.03] group transition-all cursor-pointer" onClick={() => setEditingFile(file)}>
            <div className="flex items-center gap-8">
              <div className="w-14 h-14 bg-zinc-900/50 border-2 border-zinc-800 rounded-2xl flex items-center justify-center group-hover:bg-blue-600/10 group-hover:border-blue-500/30 transition-all">
                <svg className="w-7 h-7 text-zinc-600 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <span className="text-zinc-300 group-hover:text-white transition-colors text-xl font-black tracking-tighter">{file.name}</span>
                <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mt-1.5">{file.content.length} bytes allocation</p>
              </div>
            </div>
            <div className="flex gap-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={(e) => { e.stopPropagation(); setEditingFile(file); }}
                className="text-zinc-500 hover:text-blue-500 text-xs font-black uppercase tracking-widest"
              >
                Edit
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleDelete(file.name); }}
                className="text-zinc-700 hover:text-red-500 text-xs font-black uppercase tracking-widest"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileManager;
