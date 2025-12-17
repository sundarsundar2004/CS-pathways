import React from 'react';
import { Clock, Users, ChevronRight } from 'lucide-react';
import { Course } from '../types';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const difficultyColor = {
    'Beginner': 'text-emerald-600 bg-emerald-50',
    'Intermediate': 'text-amber-600 bg-amber-50',
    'Advanced': 'text-rose-600 bg-rose-50',
  }[course.difficulty];

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full group">
      <div className="h-40 overflow-hidden relative">
        <img 
          src={course.thumbnailUrl} 
          alt={course.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-semibold rounded-md ${difficultyColor}`}>
            {course.difficulty}
          </span>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="text-xs font-medium text-brand-600 mb-2 uppercase tracking-wide">
          {course.category}
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-slate-500 text-sm mb-4 line-clamp-3 flex-1">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-slate-500 mt-auto pt-4 border-t border-slate-100">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {course.totalDuration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {course.studentCount.toLocaleString()}
            </span>
          </div>
          <Link 
            to={`/course/${course.id}`}
            className="flex items-center gap-1 text-brand-600 font-medium hover:text-brand-700"
          >
            Start
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};
