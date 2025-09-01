import React from 'react';
import { sanitizeHtml } from '@/lib/validation';

interface SafeTextProps {
  content: string;
  className?: string;
  tag?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  allowHtml?: boolean;
  maxLength?: number;
}

export default function SafeText({ 
  content, 
  className = '', 
  tag = 'span',
  allowHtml = false,
  maxLength
}: SafeTextProps) {
  // Sanitize the content
  const sanitizedContent = allowHtml ? sanitizeHtml(content) : content;
  
  // Truncate if maxLength is specified
  const displayContent = maxLength && sanitizedContent.length > maxLength 
    ? sanitizedContent.substring(0, maxLength) + '...'
    : sanitizedContent;

  // Render based on tag
  switch (tag) {
    case 'h1':
      return <h1 className={className}>{displayContent}</h1>;
    case 'h2':
      return <h2 className={className}>{displayContent}</h2>;
    case 'h3':
      return <h3 className={className}>{displayContent}</h3>;
    case 'h4':
      return <h4 className={className}>{displayContent}</h4>;
    case 'h5':
      return <h5 className={className}>{displayContent}</h5>;
    case 'h6':
      return <h6 className={className}>{displayContent}</h6>;
    case 'p':
      return <p className={className}>{displayContent}</p>;
    case 'div':
      return <div className={className}>{displayContent}</div>;
    default:
      return <span className={className}>{displayContent}</span>;
  }
}

// Specialized components for common use cases
export const SafeHeading = ({ content, level = 1, className = '' }: { 
  content: string; 
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}) => {
  const tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return <SafeText content={content} tag={tag} className={className} />;
};

export const SafeParagraph = ({ content, className = '' }: { 
  content: string; 
  className?: string;
}) => {
  return <SafeText content={content} tag="p" className={className} />;
};

export const SafeSpan = ({ content, className = '' }: { 
  content: string; 
  className?: string;
}) => {
  return <SafeText content={content} tag="span" className={className} />;
}; 