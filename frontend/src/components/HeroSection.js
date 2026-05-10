import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { ADDRESS, WHATSAPP_NUM, CALL_NUM } from '../constants';

export function HeroSection({ whatsappLink, onScrollToPricing }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" data-testid="hero-section">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://static.prod-images.emergentagent.com/jobs/e4fdd787-24ba-4cf8-a44f-55dc826a8083/images/7d5fa1ae63b1fb4bb02a8a1fb8424cb8a332ec613eae0761b0b74ef6fb135db8.png)' }} />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-semibold text-white mb-4 leading-tight drop-shadow-lg" data-testid="hero-title">Rivaz Boutique</h1>
        <p className="text-base sm:text-lg text-white/90 mb-8 font-light" data-testid="hero-subtitle">Women's Designer Boutique in Ghaziabad | Indirapuram | Noida | Delhi</p>
        <p className="text-sm text-white/80 mb-2" data-testid="hero-subtitle-2">Latest Lehnga, Kurta, Blouse, Gown, Saree Trends 2026</p>
        <p className="text-sm text-white/90 font-medium mb-5" data-testid="hero-stitching-note">Custom Stitching &amp; Alterations Available</p>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-whatsapp text-white px-6 py-2 rounded-full font-semibold text-lg mb-4 hover:brightness-110 transition-all shadow-md" data-testid="hero-whatsapp-badge">
          <MessageCircle className="w-5 h-5" />{WHATSAPP_NUM}
        </a>
        <div className="mb-6">
          <button onClick={onScrollToPricing} className="inline-flex items-center gap-2 bg-rose text-white px-6 py-2 rounded-full font-medium hover:brightness-110 transition-all shadow-md" data-testid="hero-pricing-btn">Click To Check The Pricing</button>
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
