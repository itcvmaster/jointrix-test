import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Slide } from '@/types/presentation';
import { cn } from '@/lib/utils';

interface SlideRendererProps {
  slide: Slide;
  className?: string;
}

const SlideRenderer: React.FC<SlideRendererProps> = ({ slide, className }) => {
  const renderContent = () => {
    if (slide.layout === 'split') {
      const parts = slide.content.split('---');
      const leftContent = parts[0]?.trim() || '';
      const rightContent = parts[1]?.trim() || '';
      
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
          <div className="overflow-auto">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {leftContent}
            </ReactMarkdown>
          </div>
          <div className="overflow-auto">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {rightContent}
            </ReactMarkdown>
          </div>
        </div>
      );
    }
    
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {slide.content}
      </ReactMarkdown>
    );
  };

  const getLayoutClasses = () => {
    switch (slide.layout) {
      case 'title':
        return 'text-center flex flex-col justify-center items-center';
      case 'code':
        return 'font-mono text-sm';
      case 'split':
        return '';
      default:
        return '';
    }
  };

  return (
    <div className={cn(
      'w-full h-full p-8 bg-white text-gray-900 overflow-auto',
      'prose prose-lg max-w-none',
      'prose-headings:text-gray-900 prose-p:text-gray-700',
      'prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:rounded',
      'prose-pre:bg-gray-900 prose-pre:text-white',
      getLayoutClasses(),
      className
    )}>
      {renderContent()}
    </div>
  );
};

const markdownComponents = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '');
    
    return !inline && match ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        className="rounded-lg"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  h1: ({ children }: any) => (
    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
      {children}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-gray-800">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-xl md:text-2xl font-medium mb-3 text-gray-700">
      {children}
    </h3>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc list-inside space-y-2 text-lg md:text-xl">
      {children}
    </ul>
  ),
  li: ({ children }: any) => (
    <li className="text-gray-700 leading-relaxed">
      {children}
    </li>
  ),
  p: ({ children }: any) => (
    <p className="text-lg md:text-xl leading-relaxed mb-4 text-gray-700">
      {children}
    </p>
  )
};

export default SlideRenderer;