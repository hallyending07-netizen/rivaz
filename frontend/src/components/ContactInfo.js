import React from 'react';
import { MapPin, Phone, Instagram, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUM, CALL_NUM, INSTAGRAM, ADDRESS } from '../constants';

export function ContactInfo({ whatsappLink, mapLink }) {
  return (
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
  );
}
