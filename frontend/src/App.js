import React, { useState } from 'react';
import './App.css';
import { MapPin, Phone, Instagram, Scissors, Package, Truck, ChevronRight } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const ownerImage = 'https://customer-assets.emergentagent.com/job_e4fdd787-24ba-4cf8-a44f-55dc826a8083/artifacts/8mvgim9m_1000316404.jpg';

  const services = [
    {
      icon: <Scissors className="w-8 h-8" />,
      title: 'Custom Stitching',
      description: 'Bespoke tailoring that fits your exact measurements and style perfectly.'
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: 'Alterations',
      description: 'Expert alterations to give your existing wardrobe a flawless new fit.'
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Free Pick & Drop',
      description: 'Enjoy the convenience of complimentary home pickup and delivery.'
    }
  ];

  const dresses = [
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

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hello, I would like to book an appointment at Rivaz Boutique');
    window.open(`https://wa.me/919654524332?text=${message}`, '_blank');
  };

  const handleMapClick = () => {
    const location = encodeURIComponent('Rivaz Boutique opposite Amarpali Village building gate Makanpur Ghaziabad');
    window.open(`https://www.google.com/maps/search/?api=1&query=${location}`, '_blank');
  };

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50" data-testid="header">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-playfair font-semibold text-primary" data-testid="site-title">
            Rivaz Boutique
          </h1>
          <button
            onClick={handleWhatsAppClick}
            className="bg-accent text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full font-medium hover:bg-accent/90 transition-all flex items-center gap-2 text-sm md:text-base"
            data-testid="header-whatsapp-button"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Book Now</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1765009433753-c7462637d21f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBib3V0aXF1ZSUyMGludGVyaW9yJTIwY2xvdGhpbmd8ZW58MHx8fHwxNzc1OTc0NDk5fDA&ixlib=rb-4.1.0&q=85)'
          }}
        />
        <div className="absolute inset-0 bg-white/40" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-semibold text-gray-900 mb-4 leading-tight" data-testid="hero-title">
            Rivaz Boutique
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-6 font-light" data-testid="hero-subtitle">
            Your Destination for Elegant Ethnic Wear
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-800 mb-8" data-testid="hero-location">
            <MapPin className="w-5 h-5 text-primary" />
            <p className="text-sm sm:text-base">Opposite Amarpali Village Building Gate, Makanpur, Ghaziabad</p>
          </div>
          <button
            onClick={handleWhatsAppClick}
            className="bg-accent text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-3"
            data-testid="hero-whatsapp-cta"
          >
            <Phone className="w-5 h-5" />
            Book on WhatsApp
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 px-4 bg-secondary/30" data-testid="services-section">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-playfair font-semibold text-center mb-12 text-gray-900" data-testid="services-title">
            Our Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-pink-50"
                data-testid={`service-card-${index}`}
              >
                <div className="text-primary mb-4" data-testid={`service-icon-${index}`}>
                  {service.icon}
                </div>
                <h4 className="text-xl font-playfair font-semibold mb-3 text-gray-900" data-testid={`service-title-${index}`}>
                  {service.title}
                </h4>
                <p className="text-gray-600 leading-relaxed" data-testid={`service-description-${index}`}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Gallery */}
      <section className="py-16 md:py-24 px-4" data-testid="collection-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-playfair font-semibold mb-4 text-gray-900" data-testid="collection-title">
              Our Collection
            </h3>
            <div className="w-20 h-1 bg-primary mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto" data-testid="collection-subtitle">
              Discover our curated selection of exquisite ethnic wear, handpicked for every occasion
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="collection-grid">
            {dresses.map((dress, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all"
                data-testid={`dress-card-${index}`}
              >
                <img
                  src={dress}
                  alt={`Ethnic dress ${index + 1}`}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  data-testid={`dress-image-${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Owner */}
      <section className="py-16 md:py-24 px-4 bg-secondary/30" data-testid="owner-section">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-3xl md:text-4xl font-playfair font-semibold mb-6 text-gray-900" data-testid="owner-title">
                Meet Our Master Craftsman
              </h3>
              <h4 className="text-2xl font-playfair text-primary mb-4" data-testid="owner-name">
                Munna Idresy
              </h4>
              <p className="text-gray-700 leading-relaxed mb-4" data-testid="owner-experience">
                <span className="font-semibold text-primary">35+ Years of Master Craftsmanship</span>
              </p>
              <p className="text-gray-600 leading-relaxed" data-testid="owner-description">
                With over three decades of dedication to the art of tailoring, Munna Idresy brings unparalleled expertise and passion to every garment. His meticulous attention to detail and commitment to perfection has made Rivaz Boutique a trusted name in custom stitching and alterations.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="rounded-2xl overflow-hidden shadow-2xl" data-testid="owner-image-container">
                <img
                  src={ownerImage}
                  alt="Munna Idresy"
                  className="w-full h-96 object-cover"
                  data-testid="owner-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 md:py-24 px-4" data-testid="contact-section">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-secondary to-pink-50 rounded-2xl p-8 md:p-12 shadow-xl">
            <h3 className="text-3xl font-playfair font-semibold text-center mb-4 text-gray-900" data-testid="contact-title">
              Need Custom Stitching?
            </h3>
            <p className="text-center text-gray-600 mb-8" data-testid="contact-subtitle">
              Our expert tailors are ready to create the perfect outfit for you. Book your consultation today.
            </p>
            {showSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6" data-testid="success-message">
                Thank you! We'll contact you soon.
              </div>
            )}
            <form onSubmit={handleSubmit} data-testid="contact-form">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="contact-name-input"
                />
                <input
                  type="tel"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="contact-phone-input"
                />
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="contact-message-input"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-all disabled:opacity-50"
                  data-testid="contact-submit-button"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4" data-testid="footer">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-playfair font-semibold mb-4" data-testid="footer-brand">Rivaz Boutique</h4>
              <p className="text-gray-400 text-sm" data-testid="footer-tagline">Your destination for elegant ethnic wear and expert tailoring</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4" data-testid="footer-contact-title">Contact Us</h5>
              <div className="space-y-2 text-sm">
                <a href="tel:+919654524333" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors" data-testid="footer-phone">
                  <Phone className="w-4 h-4" />
                  9654524333
                </a>
                <a href="https://wa.me/919654524332?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Rivaz%20Boutique" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors" data-testid="footer-whatsapp">
                  <Phone className="w-4 h-4" />
                  WhatsApp: 9654524332
                </a>
                <a href="https://instagram.com/the_rivaz_studio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors" data-testid="footer-instagram">
                  <Instagram className="w-4 h-4" />
                  @the_rivaz_studio
                </a>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4" data-testid="footer-location-title">Location</h5>
              <button onClick={handleMapClick} className="text-sm text-gray-400 hover:text-white transition-colors flex items-start gap-2" data-testid="footer-map-button">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Opposite Amarpali Village Building Gate, Makanpur, Ghaziabad</span>
              </button>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400" data-testid="footer-copyright">
            <p>© 2025 Rivaz Boutique. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;