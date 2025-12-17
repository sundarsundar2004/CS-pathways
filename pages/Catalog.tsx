import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { MOCK_COURSES } from '../constants';
import { Category, Difficulty } from '../types';
import { CourseCard } from '../components/CourseCard';

export const Catalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const categories = ['All', ...Object.values(Category)];
  const difficulties = ['All', ...Object.values(Difficulty)];

  const filteredCourses = MOCK_COURSES.filter(course => {
    const catMatch = selectedCategory === 'All' || course.category === selectedCategory;
    const diffMatch = selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;
    return catMatch && diffMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Explore Courses</h1>
          <p className="text-slate-500 mt-1">Master new skills with our structured learning paths.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
           <div className="relative">
             <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white border border-slate-200 text-slate-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
             >
               {categories.map(c => <option key={c} value={c}>{c}</option>)}
             </select>
             <Filter className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
           </div>

           <div className="relative">
             <select 
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="appearance-none bg-white border border-slate-200 text-slate-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
             >
               {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
             </select>
             <Filter className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
           </div>
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
          <p className="text-slate-500 text-lg">No courses found matching your criteria.</p>
          <button 
            onClick={() => {setSelectedCategory('All'); setSelectedDifficulty('All')}}
            className="mt-4 text-brand-600 font-medium hover:underline"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};
