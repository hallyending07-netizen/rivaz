import { MapPin, Phone, Instagram, MessageCircle } from 'lucide-react';
import { NAV_LINKS, WHATSAPP_NUM, CALL_NUM, INSTAGRAM, ADDRESS } from '../constants';
import { ContactInfo } from './ContactInfo';
import { ContactForm } from './ContactForm';

export function Footer({ whatsappLink, mapLink }) {
  return (
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
  );
}

export function ContactSection({ whatsappLink, mapLink }) {
  return (
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
  );
}
