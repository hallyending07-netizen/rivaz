import { useState } from 'react';
import './App.css';
import { Menu, X, MessageCircle } from 'lucide-react';
import { NAV_LINKS, ADDRESS, WHATSAPP_NUM } from './constants';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { CollectionSection } from './components/CollectionSection';
import { PricingSection, PoliciesSection } from './components/PricingPolicies';
import { ContactSection, Footer } from './components/FooterContact';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function App() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const whatsappLink = `https://wa.me/91${WHATSAPP_NUM}?text=${encodeURIComponent('Hello, I would like to book an appointment at Rivaz Boutique')}`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

  return (
    <div className="min-h-screen bg-white font-outfit">
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50" data-testid="header">
        <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 flex justify-between items-center">
          <button onClick={() => scrollToSection('home')} className="text-xl md:text-2xl font-playfair font-semibold text-rose" data-testid="site-title">
            Rivaz Boutique
          </button>
          <nav className="hidden md:flex items-center gap-3 lg:gap-5" data-testid="desktop-nav">
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollToSection(l.id)} className="text-xs lg:text-sm text-gray-600 hover:text-rose transition-colors whitespace-nowrap" data-testid={`nav-${l.id}`}>
                {l.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-whatsapp text-white px-3 md:px-4 py-2 rounded-full font-medium hover:brightness-110 transition-all flex items-center gap-2 text-xs md:text-sm whitespace-nowrap" data-testid="header-whatsapp-button">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Book An Appointment</span>
            </a>
            <button className="md:hidden text-gray-700" onClick={() => setMobileMenu(!mobileMenu)} data-testid="mobile-menu-toggle">
              {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <nav className="md:hidden bg-white border-t px-4 py-4 space-y-3" data-testid="mobile-nav">
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => { scrollToSection(l.id); setMobileMenu(false); }} className="block w-full text-left text-gray-700 hover:text-rose transition-colors py-1" data-testid={`mobile-nav-${l.id}`}>
                {l.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <HeroSection whatsappLink={whatsappLink} onScrollToPricing={() => scrollToSection('pricing')} />
      <ServicesSection />
      <CollectionSection />
      <PricingSection whatsappLink={whatsappLink} />
      <PoliciesSection />
      <ContactSection whatsappLink={whatsappLink} mapLink={mapLink} />
      <AboutSection />
      <TestimonialsSection />
      <Footer whatsappLink={whatsappLink} mapLink={mapLink} />
    </div>
  );
}

export default App;
