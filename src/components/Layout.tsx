import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ConceptBanner } from './ConceptBanner';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingActions } from './FloatingActions';
import { ScrollManager } from './ScrollManager';

export function Layout() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <ScrollManager />
      <ConceptBanner />
      <Header />
      <main id="main" tabIndex={-1} style={{ outline: 'none' }}>
        <Suspense fallback={<div className="page-loading container" role="status">Loading…</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
