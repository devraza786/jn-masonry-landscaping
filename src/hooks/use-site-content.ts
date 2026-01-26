import { useContext } from 'react';
import { ContentContext } from '@/lib/content-context';

export const useSiteContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within ContentProvider');
  }
  return context;
};
