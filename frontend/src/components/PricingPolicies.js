import { MessageCircle } from 'lucide-react';
import { ShieldCheck, Clock, AlertCircle, Heart, CheckCircle } from 'lucide-react';
import { POLICIES } from '../constants';

const POLICY_ICONS = [
  <AlertCircle className="w-5 h-5" />,
  <CheckCircle className="w-5 h-5" />,
  <ShieldCheck className="w-5 h-5" />,
  <Clock className="w-5 h-5" />,
  <Heart className="w-5 h-5" />,
  <CheckCircle className="w-5 h-5" />,
];

export function PricingSection({ whatsappLink }) {
  return (
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
  );
}

export function PoliciesSection() {
  return (
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
  );
}
