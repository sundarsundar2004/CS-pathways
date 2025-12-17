import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle, HelpCircle, ChevronRight } from 'lucide-react';
import { MOCK_COURSES } from '../constants';
import { GeminiService } from '../services/geminiService';
import { Lesson } from '../types';

export const LessonView: React.FC = () => {
  const { courseId, lessonId } = useParams();
  const [activeTab, setActiveTab] = useState<'learn' | 'quiz'>('learn');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  
  // Locate data
  const course = MOCK_COURSES.find(c => c.id === courseId);
  // Flatten modules to find lesson (simplified)
  const allLessons = course?.modules.flatMap(m => m.lessons) || [];
  const lessonIndex = allLessons.findIndex(l => l.id === lessonId);
  const lesson = allLessons[lessonIndex];
  const nextLesson = allLessons[lessonIndex + 1];

  if (!course || !lesson) {
    return <div className="p-8">Lesson not found</div>;
  }

  const handleRunCode = async () => {
    if (!lesson.codeSnippet) return;
    setIsRunning(true);
    const result = await GeminiService.simulateCodeExecution(lesson.codeSnippet.code, lesson.codeSnippet.language);
    setOutput(result);
    setIsRunning(false);
  };

  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6">
      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-4">
            <Link to={`/course/${courseId}`} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h2 className="font-bold text-slate-900">{lesson.title}</h2>
              <p className="text-xs text-slate-500">{course.title}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('learn')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'learn' ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Learn
            </button>
            {lesson.quiz && (
               <button 
               onClick={() => setActiveTab('quiz')}
               className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'quiz' ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'}`}
             >
               Quiz
             </button>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {activeTab === 'learn' ? (
            <div className="prose prose-slate max-w-none">
              <div className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed">
                {lesson.content.split('\n').map((line, i) => (
                  <p key={i} className="mb-4">{line}</p>
                ))}
              </div>
              
              {lesson.codeSnippet && (
                <div className="mt-8 not-prose">
                  <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                    <div className="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-slate-700">
                      <span className="text-xs font-mono text-slate-400">{lesson.codeSnippet.language}</span>
                      <button 
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="flex items-center gap-2 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-medium transition-colors disabled:opacity-50"
                      >
                        <Play className="w-3 h-3" />
                        {isRunning ? 'Running...' : 'Run Code'}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="p-4 font-mono text-sm text-slate-300 bg-slate-900 overflow-x-auto border-r border-slate-700">
                        <pre>{lesson.codeSnippet.code}</pre>
                      </div>
                      <div className="p-4 font-mono text-sm bg-[#0d1117] text-slate-300 min-h-[150px]">
                        <div className="text-xs text-slate-500 mb-2 uppercase tracking-wider">Terminal Output</div>
                        {output ? (
                          <div className="text-emerald-400 whitespace-pre-wrap">{output}</div>
                        ) : (
                          <div className="text-slate-600 italic">Click Run to see output...</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto py-8">
              {lesson.quiz && lesson.quiz.map((q, idx) => (
                <div key={q.id} className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-900">Question {idx + 1}</h3>
                  <p className="text-lg text-slate-700">{q.question}</p>
                  
                  <div className="space-y-3">
                    {q.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => {
                          setSelectedQuizOption(optIdx);
                          setShowExplanation(true);
                        }}
                        disabled={showExplanation}
                        className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                          showExplanation
                            ? optIdx === q.correctAnswerIndex
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                              : optIdx === selectedQuizOption
                                ? 'border-red-500 bg-red-50 text-red-900'
                                : 'border-slate-200 opacity-50'
                            : selectedQuizOption === optIdx
                              ? 'border-brand-500 bg-brand-50'
                              : 'border-slate-200 hover:border-brand-200 hover:bg-slate-50'
                        }`}
                      >
                        {opt}
                        {showExplanation && optIdx === q.correctAnswerIndex && (
                          <CheckCircle className="inline-block ml-2 w-4 h-4 text-emerald-600" />
                        )}
                      </button>
                    ))}
                  </div>

                  {showExplanation && (
                    <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-lg flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block mb-1">Explanation:</span>
                        {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50">
          {nextLesson ? (
            <Link 
              to={`/course/${courseId}/lesson/${nextLesson.id}`}
              className="flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors"
            >
              Next Lesson
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
             <Link 
             to={`/`}
             className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
           >
             Finish Course
             <CheckCircle className="w-4 h-4" />
           </Link>
          )}
        </div>
      </div>
      
      {/* Table of Contents (Desktop) */}
      <div className="hidden lg:block w-80 shrink-0">
         <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sticky top-4">
            <h3 className="font-bold text-slate-900 mb-4 px-2">Table of Contents</h3>
            <div className="space-y-4">
              {course.modules.map((mod, modIdx) => (
                <div key={mod.id}>
                   <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
                     Module {modIdx + 1}: {mod.title}
                   </div>
                   <div className="space-y-1">
                     {mod.lessons.map((l) => (
                       <Link 
                        key={l.id}
                        to={`/course/${courseId}/lesson/${l.id}`}
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors ${l.id === lessonId ? 'bg-brand-50 text-brand-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
                       >
                         {l.title}
                       </Link>
                     ))}
                   </div>
                </div>
              ))}
            </div>
         </div>
      </div>
    </div>
  );
};
