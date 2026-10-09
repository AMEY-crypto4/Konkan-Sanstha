import { lazy } from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// Route-level code splitting: the home page loads first, other pages on demand.
const About = lazy(() => import('./pages/About'));
const Programs = lazy(() => import('./pages/Programs'));
const ProgramDetail = lazy(() => import('./pages/ProgramDetail'));
const Campaigns = lazy(() => import('./pages/Campaigns'));
const CampaignDetail = lazy(() => import('./pages/CampaignDetail'));
const GetInvolved = lazy(() => import('./pages/GetInvolved'));
const Donate = lazy(() => import('./pages/Donate'));
const Volunteer = lazy(() => import('./pages/Volunteer'));
const Careers = lazy(() => import('./pages/Careers'));
const Csr = lazy(() => import('./pages/Csr'));
const Impact = lazy(() => import('./pages/Impact'));
const Stories = lazy(() => import('./pages/Stories'));
const Transparency = lazy(() => import('./pages/Transparency'));
const Contact = lazy(() => import('./pages/Contact'));

const Router = __PREVIEW__ ? HashRouter : BrowserRouter;

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="programs" element={<Programs />} />
        <Route path="programs/:slug" element={<ProgramDetail />} />
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="campaigns/:slug" element={<CampaignDetail />} />
        <Route path="get-involved" element={<GetInvolved />} />
        <Route path="donate" element={<Donate />} />
        <Route path="volunteer" element={<Volunteer />} />
        <Route path="careers" element={<Careers />} />
        <Route path="csr" element={<Csr />} />
        <Route path="impact" element={<Impact />} />
        <Route path="stories" element={<Stories />} />
        <Route path="transparency" element={<Transparency />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

/** Opts in to React Router v7 behaviour now, so a later upgrade changes nothing. */
const FUTURE = { v7_startTransition: true, v7_relativeSplatPath: true } as const;

export default function App() {
  return (
    <Router future={FUTURE}>
      <AppRoutes />
    </Router>
  );
}
