import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Trophy, Flame, Target, BookOpen } from 'lucide-react';

const activityData = [
  { day: 'Mon', xp: 120 },
  { day: 'Tue', xp: 200 },
  { day: 'Wed', xp: 150 },
  { day: 'Thu', xp: 300 },
  { day: 'Fri', xp: 250 },
  { day: 'Sat', xp: 180 },
  { day: 'Sun', xp: 90 },
];

const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{label}</p>
      <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, John! 👋</h1>
        <p className="text-slate-500 mt-2">You're making great progress. Keep it up!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Flame} label="Day Streak" value="12" color="bg-orange-100 text-orange-600" />
        <StatCard icon={Trophy} label="Total XP" value="1,240" color="bg-yellow-100 text-yellow-600" />
        <StatCard icon={BookOpen} label="Lessons Done" value="24" color="bg-blue-100 text-blue-600" />
        <StatCard icon={Target} label="Accuracy" value="94%" color="bg-emerald-100 text-emerald-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Learning Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="xp" radius={[4, 4, 0, 0]}>
                  {activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.xp > 200 ? '#2563eb' : '#93c5fd'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommended Next Step */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Continue Learning</h3>
          
          <div className="flex-1 flex flex-col gap-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-brand-200 transition-colors cursor-pointer group">
              <div className="text-xs text-brand-600 font-semibold mb-1">PYTHON BASICS</div>
              <h4 className="font-bold text-slate-800 mb-2 group-hover:text-brand-600 transition-colors">Variables & Data Types</h4>
              <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                <div className="bg-brand-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <div className="text-xs text-slate-500">15 min remaining</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-brand-200 transition-colors cursor-pointer group opacity-75">
               <div className="text-xs text-brand-600 font-semibold mb-1">DATA STRUCTURES</div>
               <h4 className="font-bold text-slate-800 mb-2 group-hover:text-brand-600 transition-colors">Intro to Linked Lists</h4>
               <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                 <div className="bg-slate-300 h-2 rounded-full" style={{ width: '0%' }}></div>
               </div>
               <div className="text-xs text-slate-500">20 min • Not started</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
