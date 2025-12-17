import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  LayoutDashboard, 
  Trophy, 
  Menu, 
  X, 
  Search,
  Bell,
  Code2,
  BrainCircuit
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

interface NavItemProps {
  to: string;
  icon: any;
  label: string;
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      active 
        ? 'bg-brand-50 text-brand-700 font-medium' 
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`}
  >
    <Icon className={`w-5 h-5 ${active ? 'text-brand-600' : 'text-slate-400'}`} />
    <span>{label}</span>
  </Link>
);

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/catalog', label: 'Course Catalog', icon: BookOpen },
    { path: '/playground', label: 'Code Playground', icon: Code2 },
    { path: '/achievements', label: 'Achievements', icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-2 font-bold text-xl text-brand-700">
          <BrainCircuit className="w-8 h-8" />
          <span>NexusCS</span>
        </div>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside 
        className={`fixed md:sticky top-0 h-screen w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out z-10 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col`}
      >
        <div className="p-6 border-b border-slate-100 hidden md:flex items-center gap-3 font-bold text-2xl text-brand-700">
          <BrainCircuit className="w-8 h-8" />
          <span>NexusCS</span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navLinks.map((link) => (
            <NavItem 
              key={link.path} 
              to={link.path} 
              label={link.label} 
              icon={link.icon} 
              active={location.pathname === link.path} 
            />
          ))}
          
          <div className="pt-8 pb-2 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Your Paths
          </div>
          <Link to="/course/c1" className="block px-4 py-2 text-sm text-slate-600 hover:text-brand-600 truncate">
            Python for Beginners
          </Link>
          <Link to="/course/c2" className="block px-4 py-2 text-sm text-slate-600 hover:text-brand-600 truncate">
            Data Structures & Algos
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-xs">
              JD
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-slate-900 truncate">John Doe</p>
              <p className="text-xs text-slate-500 truncate">Level 5 Scholar</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 md:ml-0">
        {/* Top Header (Desktop) */}
        <header className="bg-white h-16 border-b border-slate-200 hidden md:flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="w-96 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search topics, courses, or questions..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-0 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};