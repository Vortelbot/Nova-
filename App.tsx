
import React, { useState, useEffect } from 'react';
import { Bot, BotStatus, Node, LogEntry, User } from './types';
import { initialBots, initialNodes, users as initialUsers } from './store/mockData';
import Sidebar from './components/Sidebar';
import BotCard from './components/BotCard';
import Console from './components/Console';
import StatsChart from './components/StatsChart';
import DeployModal from './components/DeployModal';
import FileManager from './components/FileManager';
import ActivityTab from './components/ActivityTab';
import Login from './components/Login';
import AdminNodes from './components/AdminNodes';
import AdminServers from './components/AdminServers';
import AdminUsers from './components/AdminUsers';
import ServerSettings from './components/ServerSettings';
import ServerAI from './components/ServerAI';
import DeploymentGuide from './components/DeploymentGuide';
import { simulateExecution } from './services/geminiService';

const DB_PREFIX = 'nova_release_final_v2';
const KEYS = {
  BOTS: `${DB_PREFIX}_bots`,
  NODES: `${DB_PREFIX}_nodes`,
  AUTH: `${DB_PREFIX}_auth_user`,
  USERS: `${DB_PREFIX}_all_users`
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(KEYS.AUTH);
    return saved ? JSON.parse(saved) : null;
  });

  const [allUsers, setAllUsers] = useState<User[]>(()