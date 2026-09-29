import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import LandingPage from './pages/LandingPage';
import WorkshopsPage from './pages/WorkshopsPage';
import ServicesPage from './pages/ServicesPage';
import PricesPage from './pages/PricesPage';
import AboutPage from './pages/AboutPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactsPage from './pages/ContactsPage';
import SubmitLeadPage from './pages/SubmitLeadPage';
import PublicTrackPage from './pages/PublicTrackPage';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import PaymentPage from './pages/PaymentPage';
import MasterProfilePage from './pages/MasterProfilePage';

import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

import './index.css';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition-wrapper">
      <Routes location={location}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/workshops" element={<WorkshopsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/prices" element={<PricesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/submit" element={<SubmitLeadPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/pay" element={<PaymentPage />} />
        <Route path="/master-profile" element={<MasterProfilePage />} />
        <Route path="/track" element={<PublicTrackPage />} />
        <Route path="/track/:token" element={<PublicTrackPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          {initialLoading && (
            <PageLoader onFinish={() => setInitialLoading(false)} />
          )}

          <div className="app-layout">
            <Navbar />
            <main className="main-content">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}
