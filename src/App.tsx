import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { SiteLayout } from './components/SiteLayout';
import { ExperiencePage } from './pages/ExperiencePage';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { PrivateDiningPage } from './pages/PrivateDiningPage';
import { ReservationsPage } from './pages/ReservationsPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/private-dining" element={<PrivateDiningPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}
