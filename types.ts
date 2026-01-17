
export enum BotStatus {
  STARTING = 'STARTING',
  RUNNING = 'RUNNING',
  STOPPING = 'STOPPING',
  OFFLINE = 'OFFLINE',
  ERROR = 'ERROR'
}

export interface VirtualFile {
  name: string;
  content: string;
}

export interface ActivityRecord {
  id: string;
  timestamp: string;
  event: string;
  user: string;
  ip: string;
  metadata?: string;
}

export type SupportedLanguage = 'javascript' | 'python' | 'java' | 'rust' | 'go' | 'cpp' | 'ruby' | 'php' | 'typescript';

export interface Bot {
  id: string;
  name: string;
  description: string;
  status: BotStatus;
  memoryUsage: number;
  cpuUsage: number;
  diskUsage: number;
  maxMemory: number;
  maxCpu: number;
  maxDisk: number;
  lastStarted: string;
  nodeId: string;
  language: SupportedLanguage;
  uptime: number;
  ownerId: string;
  files: VirtualFile[];
  isSuspended?: boolean;
  isLocked?: boolean;
  aiEnabled?: boolean;
}

export interface Node {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  ip: string;
  totalRam: number;
  usedRam: number;
  totalCpu: number;
  usedCpu: number;
  totalDisk: number;
  maxBots: number;
  currentBots: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
  createdAt: string;
  isSuspended?: boolean;
}

export interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'error' | 'warn' | 'system';
}
