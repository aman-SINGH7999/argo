'use client';
import { useState } from 'react';

export default function useAuth() {
  const [user, setUser] = useState(() => {
    try {
      if (typeof window === 'undefined') return null;
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  return { user, setUser };
}
