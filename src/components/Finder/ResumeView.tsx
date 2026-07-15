import React, { useState, useEffect, lazy, Suspense } from 'react';
import { FileText } from 'lucide-react';

const ResumePreview = lazy(() => import('./ResumePreview.tsx'));

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: any}> {
  constructor(props: any) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error: any) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return <div className="p-8 text-red-500 overflow-auto">Error: {this.state.error?.message || 'Unknown error'}</div>;
    }
    return this.props.children;
  }
}

export default function ResumeView() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="h-full -m-6 relative">
      <div className="absolute top-4 right-6 z-10">
        <a 
          href="/vipul_resume.pdf" 
          download 
          className="px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[12px] font-medium text-white/90 hover:bg-black/60 transition-colors shadow-lg flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#0058d0] focus:ring-offset-2 focus:ring-offset-transparent"
          aria-label="Download Resume PDF"
        >
          <FileText size={14} aria-hidden="true" />
          Download Resume
        </a>
      </div>
      <ErrorBoundary>
        {mounted ? (
          <Suspense fallback={
            <div className="h-full w-full flex items-center justify-center bg-[#f2f2f7] text-black/50 text-[13px] font-sans">
              Loading document...
            </div>
          }>
            <ResumePreview pdfUrl="/vipul_resume.pdf" />
          </Suspense>
        ) : null}
      </ErrorBoundary>
    </div>
  );
}
