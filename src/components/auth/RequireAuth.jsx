'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';


export default function RequireAuth({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [user] = useState(() => {
    try {
      if (typeof window === 'undefined') return null;
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    // whitelist of public pages
    const publicPaths = ['/', '/login', '/signup'];

    if (user && (pathname === '/login' || pathname === '/signup')) {
      router.replace('/'); 
      return;
    }

    // if current path is public => nothing to do
    if (publicPaths.includes(pathname)) return;

    if (pathname.startsWith('/admin')) {
      if (!user) {
        router.replace('/login');
        return;
      }
      if (user.role !== 'admin') {
        router.replace('/unauthorized');
        return;
      }
      return;
    }

    // For all other non-public routes: require login
    if (!user) {
      router.replace('/login');
      return;
    }
    
  }, [pathname, router, user]);


  const publicPaths = ['/', '/login', '/signup'];
  if (publicPaths.includes(pathname)) return <>{children}</>;


  if (!user) return null;
  if (pathname.startsWith('/admin') && user.role !== 'admin') return null;

  return <>{children}</>;
}
