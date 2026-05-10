import React, { useState } from 'react';
import './App.css';
import { MapPin, Phone, Instagram, Menu, X, ShieldCheck, Clock, AlertCircle, Heart, CheckCircle, MessageCircle } from 'lucide-react';
import { NAV_LINKS, OWNER_IMAGE, ADDRESS, WHATSAPP_NUM, CALL_NUM, INSTAGRAM, GALLERY_DRESSES, POLICIES } from './constants';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactInfo } from './components/ContactInfo';
import { ContactForm } from './components/ContactForm';

const POLICY_ICONS = [
  <AlertCircle className="w-5 h-5" />,
  <CheckCircle className="w-5 h-5" />,
  <ShieldCheck className="w-5 h-5" />,
  <Clock className="w-5 h-5" />,
  <Heart className="w-5 h-5" />,
  <CheckCircle className="w-5 h-5" />,
];

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

      {/* ───── HEADER ───── */}
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

      {/* ───── HOME / HERO ───── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" data-testid="hero-section">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1765009433753-c7462637d21f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBib3V0aXF1ZSUyMGludGVyaW9yJTIwY2xvdGhpbmd8ZW58MHx8fHwxNzc1OTc0NDk5fDA&ixlib=rb-4.1.0&q=85)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/30 to-white/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-semibold text-gray-900 mb-4 leading-tight" data-testid="hero-title">Rivaz Boutique</h1>
          <p className="text-base sm:text-lg text-gray-700 mb-2 font-light" data-testid="hero-subtitle">Book An Appointment</p>
          <p className="text-sm text-gray-600 mb-4" data-testid="hero-stitching-note">Stitching Available</p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-whatsapp text-white px-6 py-2 rounded-full font-semibold text-lg mb-4 hover:brightness-110 transition-all shadow-md" data-testid="hero-whatsapp-badge">
            <MessageCircle className="w-5 h-5" />{WHATSAPP_NUM}
          </a>
          <div className="mb-6">
            <button onClick={() => scrollToSection('pricing')} className="inline-flex items-center gap-2 bg-rose text-white px-6 py-2 rounded-full font-medium hover:brightness-110 transition-all shadow-md" data-testid="hero-pricing-btn">Click To Check The Pricing</button>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-800 mb-6" data-testid="hero-location">
            <MapPin className="w-5 h-5 text-rose flex-shrink-0" />
            <p className="text-sm sm:text-base">{ADDRESS}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-whatsapp text-white px-8 py-4 rounded-full font-medium text-lg hover:brightness-110 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-3" data-testid="hero-whatsapp-cta">
              <MessageCircle className="w-5 h-5" />Book on WhatsApp
            </a>
            <a href={`tel:+91${CALL_NUM}`} className="bg-rose text-white px-8 py-4 rounded-full font-medium text-lg hover:brightness-110 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-3" data-testid="hero-call-cta">
              <Phone className="w-5 h-5" />Call Now
            </a>
          </div>
        </div>
      </section>

      {/* ───── SERVICES ───── */}
      <ServicesSection />

      {/* ───── COLLECTION GALLERY ───── */}
      <section id="collection" className="py-16 md:py-24 px-4 bg-blush" data-testid="collection-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4 text-gray-900" data-testid="collection-title">Our Collection</h2>
            <div className="w-20 h-1 bg-rose mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto" data-testid="collection-subtitle">Discover our curated selection of exquisite ethnic wear, handpicked for every occasion</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="collection-grid">
            {GALLERY_DRESSES.map((dress) => (
              <div key={dress.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all" data-testid={`dress-card-${dress.id}`}>
                <img src={dress.url} alt={`Ethnic dress`} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300" data-testid={`dress-image-${dress.id}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── PRICING ───── */}
      <section id="pricing" className="py-16 md:py-24 px-4" data-testid="pricing-section">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4 text-gray-900" data-testid="pricing-title">Pricing</h2>
          <div className="w-20 h-1 bg-rose mx-auto mb-8" />
          <div className="bg-blush rounded-2xl p-8 md:p-12 shadow-lg border border-pink-100">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6" data-testid="pricing-text">Get a personalized quote based on your design needs.</p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-whatsapp text-white px-8 py-3 rounded-full font-medium hover:brightness-110 transition-all inline-flex items-center gap-2 shadow-md" data-testid="pricing-whatsapp-cta">
              <MessageCircle className="w-5 h-5" />Get Quote on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ───── SHOPPING POLICIES ───── */}
      <section id="policies" className="py-16 md:py-24 px-4 bg-blush" data-testid="policies-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4 text-gray-900" data-testid="policies-title">Shopping Policies</h2>
            <div className="w-20 h-1 bg-rose mx-auto" />
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100 space-y-5" data-testid="policies-list">
            {POLICIES.map((p, i) => (
              <div key={p.id} className="flex items-start gap-4" data-testid={`policy-${p.id}`}>
                <div className="text-rose mt-0.5 flex-shrink-0">{POLICY_ICONS[i]}</div>
                <p className="text-gray-700">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-lg font-playfair italic text-rose" data-testid="policies-tagline">"Every piece is specially crafted with care and attention to detail."</p>
          </div>
        </div>
      </section>

      {/* ───── CONTACT US ───── */}
      <section id="contact" className="py-16 md:py-24 px-4" data-testid="contact-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4 text-gray-900" data-testid="contact-title">Contact Us</h2>
            <div className="w-20 h-1 bg-rose mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ContactInfo whatsappLink={whatsappLink} mapLink={mapLink} />
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ───── ABOUT US ───── */}
      <section id="about" className="py-16 md:py-24 px-4 bg-blush" data-testid="about-section">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-6 text-gray-900" data-testid="about-title">About Us</h2>
              <h3 className="text-2xl font-playfair text-rose mb-4" data-testid="owner-name">Munna Idresy</h3>
              <p className="text-rose font-semibold mb-4" data-testid="owner-experience">35+ Years of Master Craftsmanship</p>
              <p className="text-gray-600 leading-relaxed mb-4" data-testid="owner-description">With over three decades of dedication to the art of tailoring, Munna Idresy brings unparalleled expertise and passion to every garment. His meticulous attention to detail and commitment to perfection has made Rivaz Boutique a trusted name in custom stitching and alterations across Ghaziabad.</p>
              <p className="text-gray-600 leading-relaxed" data-testid="owner-description-2">From bridal lehngas to everyday kurtas, every piece at Rivaz Boutique is crafted with love and precision to make you look and feel your best.</p>
            </div>
            <div className="order-1 md:order-2">
              <div className="rounded-2xl overflow-hidden shadow-2xl" data-testid="owner-image-container">
                <img src={OWNER_IMAGE} alt="Munna Idresy - Owner of Rivaz Boutique" className="w-full h-96 object-cover" data-testid="owner-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── TESTIMONIALS ───── */}
      <TestimonialsSection />

      {/* ───── FOOTER ───── */}
      <footer className="bg-gray-900 text-white py-12 px-4" data-testid="footer">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-playfair font-semibold mb-4" data-testid="footer-brand">Rivaz Boutique</h4>
              <p className="text-gray-400 text-sm">Your destination for elegant ethnic wear and expert tailoring. Stitching &amp; Alterations available.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Contact</h5>
              <div className="space-y-3 text-sm">
                <a href={`tel:+91${CALL_NUM}`} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors" data-testid="footer-phone">
                  <Phone className="w-4 h-4" /> {CALL_NUM}
                </a>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors" data-testid="footer-whatsapp">
                  <MessageCircle className="w-4 h-4" /> WhatsApp: {WHATSAPP_NUM}
                </a>
                <a href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors" data-testid="footer-instagram">
                  <Instagram className="w-4 h-4" /> @{INSTAGRAM}
                </a>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Location</h5>
              <a href={mapLink} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors flex items-start gap-2" data-testid="footer-map-button">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>{ADDRESS}</span>
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400" data-testid="footer-copyright">
            <p>&copy; 2025 Rivaz Boutique. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
