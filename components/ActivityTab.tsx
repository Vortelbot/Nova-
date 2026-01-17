
import React from 'react';
import { ActivityRecord } from '../types';

interface ActivityTabProps {
  activities: ActivityRecord[];
}

const ActivityTab: React.FC<ActivityTabProps> = ({ activities }) => {
  return (
    <div className="bg-zinc-950/40 border-2 border-zinc-900 rounded-[3rem] overflow-hidden shadow-3xl">
      <div className="px-12 py-10 border-b-2 border-zinc-900 bg-zinc-900/20">
        <h2 className="text-2xl font-black text-white">Recent Activities</h2>
        <p className="text-zinc-500 text-sm mt-1 uppercase font-bold tracking-widest">Audit logs for this instance</p>
      </div>
      <div className="divide-y-2 divide-zinc-900">
        {activities.length === 0 ? (
          <div className="p-20 text-center text-zinc-600 font-bold italic uppercase tracking-widest opacity-50">
            No activities recorded yet
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="px-12 py-8 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
              <div className="flex items-center gap-8">
                <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center group-hover:bg-blue-600/10 transition-all">
                  <svg className="w-7 h-7 text-zinc-600 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-black text-lg">{activity.event}</h4>
                  <p className="text-zinc-500 text-sm mt-0.5">
                    Triggered by <span className="text-zinc-300 font-bold">{activity.user}</span> • {activity.timestamp}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="bg-zinc-900 px-4 py-1.5 rounded-xl text-zinc-400 text-xs mono font-black">
                  {activity.ip}
                </span>
                {activity.metadata && (
                  <p className="text-[10px] text-zinc-600 mt-2 font-bold uppercase tracking-widest">{activity.metadata}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityTab;
