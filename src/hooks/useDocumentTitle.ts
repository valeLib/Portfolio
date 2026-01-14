import { useEffect } from 'react';
import { SITE_CONFIG } from '../config';

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title
      ? `${title} | ${SITE_CONFIG.title}`
      : SITE_CONFIG.title;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}
