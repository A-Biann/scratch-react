import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// return to top of page on route change
// ----------------------------------------------------------------------

export function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
