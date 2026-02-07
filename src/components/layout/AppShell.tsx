import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CustomCursor } from '../ui/CustomCursor';

export function AppShell() {
  return (
    <>
      <CustomCursor />
      {/* Skip to content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
        style={{
          backgroundColor: 'var(--accent)',
          color: 'var(--bg)',
        }}
      >
        Skip to main content
      </a>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main id="main-content" className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
