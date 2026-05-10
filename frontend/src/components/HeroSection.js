import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { ADDRESS, WHATSAPP_NUM, CALL_NUM } from '../constants';

export function HeroSection({ whatsappLink, onScrollToPricing }) {
  return (
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
          <button onClick={onScrollToPricing} className="inline-flex items-center gap-2 bg-rose text-white px-6 py-2 rounded-full font-medium hover:brightness-110 transition-all shadow-md" data-testid="hero-pricing-btn">Click To Check The Pricing</button>
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
  );
}
