import { useEffect } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import Projects from '@/components/sections/Projects';
import Publications from '@/components/sections/Publications';
import Contact from '@/components/sections/Contact';
import { resolveSection } from '@/lib/siteRoutes';

const Home = () => {
  const { section } = useParams();
  const { hash } = useLocation();

  // Support old per-page URLs (/projects) and hash links (/#projects).
  useEffect(() => {
    const raw = hash.slice(1) || section;
    const target = raw ? resolveSection(raw) : null;
    if (!target) return;
    document.getElementById(target)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    if (section) window.history.replaceState(null, '', `/#${target}`);
  }, [section, hash]);

  if (section && !resolveSection(section)) return <Navigate to="/" replace />;

  return (
    <>
      <Projects />
      <Publications />
      <Contact />
    </>
  );
};

export default Home;
