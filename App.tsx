import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Catalog } from './pages/Catalog';
import { LessonView } from './pages/LessonView';
import { AiTutor } from './components/AiTutor';

// Simple placeholder page for routes not yet implemented
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-96 text-center p-8">
    <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
    <p className="text-slate-500">This feature is under development. Check back soon!</p>
  </div>
);

const CourseOverviewRedirect = () => {
    // For demo purposes, redirecting to the first lesson of the course
    // In a real app, this would be a Course Syllabus page
    return <Navigate to="lesson/l1" replace />;
}

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/playground" element={<Placeholder title="Code Playground" />} />
          <Route path="/achievements" element={<Placeholder title="Achievements" />} />
          
          {/* Course Routes */}
          <Route path="/course/:courseId" element={<CourseOverviewRedirect />} />
          <Route path="/course/:courseId/lesson/:lessonId" element={<LessonView />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <AiTutor />
      </Layout>
    </HashRouter>
  );
};

export default App;
