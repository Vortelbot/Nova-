
import { Bot, Node, User } from '../types';

export const users: User[] = [
  {
    id: 'user-admin',
    username: 'Julian',
    password: 'admin',
    email: 'admin@novahost.io',
    role: 'admin',
    createdAt: '2023-01-01'
  },
  {
    id: 'user-client',
    username: 'dev',
    password: 'dev',
    email: 'dev@example.com',
    role: 'user',
    createdAt: '2024-03-01'
  }
];

export const initialNodes: Node[] = [
  { 
    id: 'DE-FRA-01', 
    name: 'Frankfurt-Alpha (NVMe)', 
    location: 'Germany', 
    status: 'online', 
    ip: '45.13.252.11',
    totalRam: 65536, usedRam: 0, totalCpu: 1600, usedCpu: 0, totalDisk: 1024000, maxBots: 32, currentBots: 0
  },
  { 
    id: 'DE-FRA-02', 
    name: 'Frankfurt-Beta (AMD)', 
    location: 'Germany', 
    status: 'online', 
    ip: '45.13.252.12',
    totalRam: 131072, usedRam: 0, totalCpu: 3200, usedCpu: 0, totalDisk: 2048000, maxBots: 64, currentBots: 0
  },
  { 
    id: 'DE-NUE-01', 
    name: 'Nuremberg-Store', 
    location: 'Germany', 
    status: 'online', 
    ip: '88.198.5.210',
    totalRam: 32768, usedRam: 0, totalCpu: 800, usedCpu: 0, totalDisk: 4096000, maxBots: 16, currentBots: 0
  },
  { 
    id: 'US-NYC-01', 
    name: 'NewYork-East', 
    location: 'United States', 
    status: 'online', 
    ip: '192.64.112.40',
    totalRam: 65536, usedRam: 0, totalCpu: 1200, usedCpu: 0, totalDisk: 1024000, maxBots: 30, currentBots: 0
  },
  { 
    id: 'US-LAX-01', 
    name: 'LosAngeles-West', 
    location: 'United States', 
    status: 'online', 
    ip: '104.21.4.152',
    totalRam: 32768, usedRam: 0, totalCpu: 800, usedCpu: 0, totalDisk: 512000, maxBots: 20, currentBots: 0
  },
  { 
    id: 'JP-TYO-01', 
    name: 'Tokyo-Main', 
    location: 'Japan', 
    status: 'online', 
    ip: '103.4.11.20',
    totalRam: 16384, usedRam: 0, totalCpu: 400, usedCpu: 0, totalDisk: 256000, maxBots: 12, currentBots: 0
  },
  { 
    id: 'UK-LON-01', 
    name: 'London-Cloud', 
    location: 'United Kingdom', 
    status: 'online', 
    ip: '31.13.72.36',
    totalRam: 32768, usedRam: 0, totalCpu: 800, usedCpu: 0, totalDisk: 512000, maxBots: 24, currentBots: 0
  }
];

export const initialBots: Bot[] = [];
