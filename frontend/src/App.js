import React, { useState } from 'react';
import './App.css';
import { MapPin, Phone, Instagram, Scissors, Package, Truck, ChevronRight, Menu, X, ShieldCheck, Clock, AlertCircle, Heart, CheckCircle, MessageCircle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'Shopping Policies', id: 'policies' },
  { label: 'Contact', id: 'contact' },
  { label: 'About Us', id: 'about' },
];

const OWNER_IMAGE = 'https://customer-assets.emergentagent.com/job_e4fdd787-24ba-4cf8-a44f-55dc826a8083/artifacts/8mvgim9m_1000316404.jpg';
const ADDRESS = 'Shop No. 284, Rivaz Boutique, Opposite Amarpali Village Gate No. 1, Nyay Khand 2, Makanpur, Ghaziabad';
const WHATSAPP_NUM = '9811400565';
const CALL_NUM = '9811400565';
const INSTAGRAM = 'the_rivaz_studio';

const SERVICE_CATEGORIES = [
  {
    title: 'Ladies Kurta',
    image: 'https://images.unsplash.com/photo-1759840278276-fe8d58873dc3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBsYWRpZXMlMjBrdXJ0YSUyMGV0aG5pYyUyMHdlYXJ8ZW58MHx8fHwxNzc4NDI5MTIxfDA&ixlib=rb-4.1.0&q=85',
    description: 'Beautifully stitched kurtas for every occasion'
  },
  {
    title: 'Blouse',
    image: 'https://images.unsplash.com/photo-1756483509157-4c8cb951b3e8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBkZXNpZ25lciUyMGJsb3VzZSUyMGV0aG5pY3xlbnwwfHx8fDE3Nzg0MjkxMjF8MA&ixlib=rb-4.1.0&q=85',
    description: 'Designer blouses with perfect fitting'
  },
  {
    title: 'Lehnga',
    image: 'https://images.unsplash.com/photo-1767955694884-d4bf352c23c2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBicmlkYWwlMjBsZWhlbmdhJTIwZXRobmljfGVufDB8fHx8MTc3ODQyOTEyMXww&ixlib=rb-4.1.0&q=85',
    description: 'Stunning lehngas for weddings & celebrations'
  },
  {
    title: 'Saree',
    image: 'https://images.unsplash.com/photo-1742287721821-ddf522b3f37b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzaWxrJTIwc2FyZWUlMjBldGhuaWN8ZW58MHx8fHwxNzc4NDI5MTIxfDA&ixlib=rb-4.1.0&q=85',
    description: 'Elegant sarees in silk, georgette & more'
  },
  {
    title: 'Suit',
    image: 'https://images.unsplash.com/photo-1759840278361-f1adc75529a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBsYWRpZXMlMjBrdXJ0YSUyMGV0aG5pYyUyMHdlYXJ8ZW58MHx8fHwxNzc4NDI5MTIxfDA&ixlib=rb-4.1.0&q=85',
    description: 'Anarkali, Palazzo & Salwar suits'
  },
  {
    title: 'Gown',
    image: 'https://images.unsplash.com/photo-1756483510803-eb23dedd21ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBkZXNpZ25lciUyMGJsb3VzZSUyMGV0aG5pY3xlbnwwfHx8fDE3Nzg0MjkxMjF8MA&ixlib=rb-4.1.0&q=85',
    description: 'Party wear gowns for special occasions'
  }
];

const GALLERY_DRESSES = [
  'https://images.unsplash.com/photo-1759840278326-73f26ae8c5c7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjB0cmFkaXRpb25hbCUyMGRyZXNzJTIwd29tYW58ZW58MHx8fHwxNzc1OTc0NDgxfDA&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1769275061088-85697a30ee50?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjB0cmFkaXRpb25hbCUyMGRyZXNzJTIwd29tYW58ZW58MHx8fHwxNzc1OTc0NDgxfDA&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1766763846106-321b0ef369c2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxwaW5rJTIwbGVoZW5nYSUyMGZhc2hpb258ZW58MHx8fHwxNzc1OTc0NDk5fDA&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1760461805241-dba33224ac20?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwyfHxsZWhlbmdhJTIwd2VkZGluZyUyMGZhc2hpb258ZW58MHx8fHwxNzc1OTc0NDgxfDA&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1767955694884-d4bf352c23c2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwxfHxsZWhlbmdhJTIwd2VkZGluZyUyMGZhc2hpb258ZW58MHx8fHwxNzc1OTc0NDgxfDA&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1760461804986-b9eeaa24cf28?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwzfHxsZWhlbmdhJTIwd2VkZGluZyUyMGZhc2hpb258ZW58MHx8fHwxNzc1OTc0NDgxfDA&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1760461804065-febded675ae2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHw0fHxsZWhlbmdhJTIwd2VkZGluZyUyMGZhc2hpb258ZW58MHx8fHwxNzc1OTc0NDgxfDA&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1756483554416-1b2358bc916c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxwaW5rJTIwbGVoZW5nYSUyMGZhc2hpb258ZW58MHx8fHwxNzc1OTc0NDk5fDA&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1774437890914-abf220e0585a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHw0fHxpbmRpYW4lMjB0cmFkaXRpb25hbCUyMGRyZXNzJTIwd29tYW58ZW58MHx8fHwxNzc1OTc0NDgxfDA&ixlib=rb-4.1.0&q=85'
];

const POLICIES = [
  { icon: <AlertCircle className="w-5 h-5" />, text: 'Pricing may vary based on customization and design details.' },
  { icon: <CheckCircle className="w-5 h-5" />, text: 'Orders are confirmed after successful payment.' },
  { icon: <ShieldCheck className="w-5 h-5" />, text: 'Customized orders cannot be cancelled or returned once processing starts.' },
  { icon: <Clock className="w-5 h-5" />, text: 'Delivery time may vary depending on the design and location.' },
  { icon: <Heart className="w-5 h-5" />, text: 'Slight color or design variations may occur due to lighting and handcrafted work.' },
  { icon: <CheckCircle className="w-5 h-5" />, text: 'Please check size and order details carefully before placing your order.' },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function App() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const whatsappLink = `https://wa.me/91${WHATSAPP_NUM}?text=${encodeURIComponent('Hello, I would like to book an appointment at Rivaz Boutique')}`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${API}/contact`, formData);
      setShowSuccess(true);
      setFormData({ name: '', phone: '', message: '' });
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white font-outfit">

      {/* ───── HEADER ───── */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50" data-testid="header">
        <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 flex justify-between items-center">
          <button onClick={() => scrollToSection('home')} className="text-xl md:text-2xl font-playfair font-semibold text-rose" data-testid="site-title">
            Rivaz Boutique
          </button>

          {/* Desktop Nav */}
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

        {/* Mobile Nav */}
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-semibold text-gray-900 mb-4 leading-tight" data-testid="hero-title">
            Rivaz Boutique
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-2 font-light" data-testid="hero-subtitle">
            Book An Appointment
          </p>
          <p className="text-sm text-gray-600 mb-4" data-testid="hero-stitching-note">
            Stitching Available
          </p>

          {/* WhatsApp Number Badge */}
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-whatsapp text-white px-6 py-2 rounded-full font-semibold text-lg mb-4 hover:brightness-110 transition-all shadow-md" data-testid="hero-whatsapp-badge">
            <MessageCircle className="w-5 h-5" />
            {WHATSAPP_NUM}
          </a>

          {/* Click to Check Pricing */}
          <div className="mb-6">
            <button onClick={() => scrollToSection('pricing')} className="inline-flex items-center gap-2 bg-rose text-white px-6 py-2 rounded-full font-medium hover:brightness-110 transition-all shadow-md" data-testid="hero-pricing-btn">
              Click To Check The Pricing
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-800 mb-6" data-testid="hero-location">
            <MapPin className="w-5 h-5 text-rose flex-shrink-0" />
            <p className="text-sm sm:text-base">{ADDRESS}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-whatsapp text-white px-8 py-4 rounded-full font-medium text-lg hover:brightness-110 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-3" data-testid="hero-whatsapp-cta">
              <MessageCircle className="w-5 h-5" />
              Book on WhatsApp
            </a>
            <a href={`tel:+91${CALL_NUM}`} className="bg-rose text-white px-8 py-4 rounded-full font-medium text-lg hover:brightness-110 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-3" data-testid="hero-call-cta">
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* ───── SERVICES ───── */}
      <section id="services" className="py-16 md:py-24 px-4" data-testid="services-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4 text-gray-900" data-testid="services-title">Our Services</h2>
            <div className="w-20 h-1 bg-rose mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto" data-testid="services-subtitle">Explore our wide range of ethnic wear categories</p>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" data-testid="service-categories-grid">
            {SERVICE_CATEGORIES.map((cat, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all" data-testid={`service-cat-${i}`}>
                <img src={cat.image} alt={cat.title} className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h4 className="text-xl font-playfair font-semibold mb-1" data-testid={`service-cat-title-${i}`}>{cat.title}</h4>
                  <p className="text-sm text-white/80" data-testid={`service-cat-desc-${i}`}>{cat.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stitching Services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="stitching-services-grid">
            {[
              { icon: <Scissors className="w-8 h-8" />, title: 'Custom Stitching', desc: 'Bespoke tailoring that fits your exact measurements and style perfectly.' },
              { icon: <Package className="w-8 h-8" />, title: 'Alterations', desc: 'Expert alterations to give your existing wardrobe a flawless new fit.' },
              { icon: <Truck className="w-8 h-8" />, title: 'Free Pick & Drop', desc: 'Enjoy the convenience of complimentary home pickup and delivery.' }
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-pink-100" data-testid={`stitch-service-${i}`}>
                <div className="text-rose mb-4">{s.icon}</div>
                <h4 className="text-xl font-playfair font-semibold mb-3 text-gray-900">{s.title}</h4>
                <p className="text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── COLLECTION GALLERY ───── */}
      <section id="collection" className="py-16 md:py-24 px-4 bg-blush" data-testid="collection-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4 text-gray-900" data-testid="collection-title">Our Collection</h2>
            <div className="w-20 h-1 bg-rose mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto" data-testid="collection-subtitle">Discover our curated selection of exquisite ethnic wear, handpicked for every occasion</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="collection-grid">
            {GALLERY_DRESSES.map((dress, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all" data-testid={`dress-card-${i}`}>
                <img src={dress} alt={`Ethnic dress ${i + 1}`} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300" data-testid={`dress-image-${i}`} />
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
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6" data-testid="pricing-text">
              Get a personalized quote based on your design needs.
            </p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-whatsapp text-white px-8 py-3 rounded-full font-medium hover:brightness-110 transition-all inline-flex items-center gap-2 shadow-md" data-testid="pricing-whatsapp-cta">
              <MessageCircle className="w-5 h-5" />
              Get Quote on WhatsApp
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
              <div key={i} className="flex items-start gap-4" data-testid={`policy-${i}`}>
                <div className="text-rose mt-0.5 flex-shrink-0">{p.icon}</div>
                <p className="text-gray-700">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-lg font-playfair italic text-rose" data-testid="policies-tagline">
              "Every piece is specially crafted with care and attention to detail."
            </p>
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
            {/* Contact Info */}
            <div className="space-y-6" data-testid="contact-info">
              <div className="flex items-center gap-4 bg-blush p-5 rounded-xl" data-testid="contact-phone-card">
                <div className="bg-rose text-white p-3 rounded-full">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Call Us</p>
                  <a href={`tel:+91${CALL_NUM}`} className="text-lg font-semibold text-gray-900 hover:text-rose transition-colors" data-testid="contact-phone">{CALL_NUM}</a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-blush p-5 rounded-xl" data-testid="contact-whatsapp-card">
                <div className="bg-whatsapp text-white p-3 rounded-full">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">WhatsApp Booking</p>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-gray-900 hover:text-whatsapp transition-colors" data-testid="contact-whatsapp">{WHATSAPP_NUM}</a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-blush p-5 rounded-xl" data-testid="contact-instagram-card">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-3 rounded-full">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Instagram</p>
                  <a href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-gray-900 hover:text-rose transition-colors" data-testid="contact-instagram">@{INSTAGRAM}</a>
                </div>
              </div>

              <a href={mapLink} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 bg-blush p-5 rounded-xl hover:shadow-md transition-all" data-testid="contact-location-card">
                <div className="bg-rose text-white p-3 rounded-full flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Visit Us (Click for Google Maps)</p>
                  <p className="text-base font-semibold text-gray-900" data-testid="contact-address">{ADDRESS}</p>
                </div>
              </a>
            </div>

            {/* Contact Form */}
            <div className="bg-blush rounded-2xl p-8 shadow-lg border border-pink-100" data-testid="contact-form-card">
              <h3 className="text-xl font-playfair font-semibold mb-2 text-gray-900">Send us a Message</h3>
              <p className="text-gray-600 mb-6 text-sm">Our expert tailors are ready to help you.</p>
              {showSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm" data-testid="success-message">
                  Thank you! We'll contact you soon.
                </div>
              )}
              <form onSubmit={handleSubmit} data-testid="contact-form">
                <div className="space-y-4">
                  <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-rose bg-white" data-testid="contact-name-input" />
                  <input type="tel" placeholder="Your Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-rose bg-white" data-testid="contact-phone-input" />
                  <textarea placeholder="Your Message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows="4" className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-rose bg-white" data-testid="contact-message-input" />
                  <button type="submit" disabled={isSubmitting} className="w-full bg-rose text-white py-3 rounded-lg font-medium hover:brightness-110 transition-all disabled:opacity-50" data-testid="contact-submit-button">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ───── ABOUT US ───── */}
      <section id="about" className="py-16 md:py-24 px-4 bg-blush" data-testid="about-section">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-6 text-gray-900" data-testid="about-title">
                About Us
              </h2>
              <h3 className="text-2xl font-playfair text-rose mb-4" data-testid="owner-name">
                Munna Idresy
              </h3>
              <p className="text-rose font-semibold mb-4" data-testid="owner-experience">
                35+ Years of Master Craftsmanship
              </p>
              <p className="text-gray-600 leading-relaxed mb-4" data-testid="owner-description">
                With over three decades of dedication to the art of tailoring, Munna Idresy brings unparalleled expertise and passion to every garment. His meticulous attention to detail and commitment to perfection has made Rivaz Boutique a trusted name in custom stitching and alterations across Ghaziabad.
              </p>
              <p className="text-gray-600 leading-relaxed" data-testid="owner-description-2">
                From bridal lehngas to everyday kurtas, every piece at Rivaz Boutique is crafted with love and precision to make you look and feel your best.
              </p>
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
      <section id="testimonials" className="py-16 md:py-24 px-4" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4 text-gray-900" data-testid="testimonials-title">What Our Customers Say</h2>
            <div className="w-20 h-1 bg-rose mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="testimonials-grid">
            {[
              { name: 'Priya Sharma', text: 'Amazing stitching quality! Got my bridal lehnga done from Rivaz Boutique and it was absolutely perfect. Munna bhai is a true craftsman.', rating: 5 },
              { name: 'Anjali Gupta', text: 'Best boutique in Ghaziabad for custom stitching. The fitting was perfect and delivery was on time. Free pick & drop service is a bonus!', rating: 5 },
              { name: 'Neha Singh', text: 'I have been getting my clothes stitched from here for years. The quality and attention to detail is unmatched. Highly recommended!', rating: 5 },
              { name: 'Ritu Verma', text: 'Got my daughter\'s wedding outfits done from Rivaz Boutique. Every piece was beautifully crafted. Thank you Munna bhai!', rating: 5 },
              { name: 'Sunita Yadav', text: 'Very professional and skilled tailoring. The alterations they did on my saree blouse were perfect. Will definitely come back again.', rating: 5 },
              { name: 'Kavita Jain', text: 'Excellent work on my Anarkali suit. The embroidery and stitching quality is top-notch. Reasonable pricing too!', rating: 5 },
            ].map((t, i) => (
              <div key={i} className="bg-blush rounded-2xl p-6 shadow-lg border border-pink-100" data-testid={`testimonial-${i}`}>
                <div className="flex gap-1 mb-3 text-yellow-400" data-testid={`testimonial-stars-${i}`}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed italic" data-testid={`testimonial-text-${i}`}>"{t.text}"</p>
                <p className="font-semibold text-gray-900" data-testid={`testimonial-name-${i}`}>{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
