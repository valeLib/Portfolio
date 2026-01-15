import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const Work = lazy(() => import('./pages/Work').then((m) => ({ default: m.Work })));
const CaseStudy = lazy(() =>
  import('./pages/CaseStudy').then((m) => ({ default: m.CaseStudy }))
);
const Gallery = lazy(() =>
  import('./pages/Gallery').then((m) => ({ default: m.Gallery }))
);
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Contact = lazy(() =>
  import('./pages/Contact').then((m) => ({ default: m.Contact }))
);
const NotFound = lazy(() =>
  import('./pages/NotFound').then((m) => ({ default: m.NotFound }))
);

// Frontend profile specific pages
const Experience = lazy(() =>
  import('./pages/Experience').then((m) => ({ default: m.Experience }))
);
const Projects = lazy(() =>
  import('./pages/Projects').then((m) => ({ default: m.Projects }))
);
const Skills = lazy(() =>
  import('./pages/Skills').then((m) => ({ default: m.Skills }))
);

// Loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 border-2 border-accent-500/30 border-t-accent-500 rounded-full animate-spin" />
        <p className="text-dark-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<Home />} />
            {/* Tech Art routes */}
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/gallery" element={<Gallery />} />
            {/* Frontend routes */}
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            {/* Shared routes */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
