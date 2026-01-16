import { useContext } from 'react';
import { LenisContext } from '../contexts/LenisContext';

export function useLenis() {
  const context = useContext(LenisContext);
  if (context === undefined) {
    throw new Error('useLenis must be used within a LenisProvider');
  }
  return context;
}
