import { Scissors, Package, Truck } from 'lucide-react';
import { SERVICE_CATEGORIES, STITCHING_SERVICES } from '../constants';

const ICONS = {
  'svc-stitch': <Scissors className="w-8 h-8" />,
  'svc-alter': <Package className="w-8 h-8" />,
  'svc-pickup': <Truck className="w-8 h-8" />,
};

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 px-4" data-testid="services-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4 text-gray-900" data-testid="services-title">Our Services</h2>
          <div className="w-20 h-1 bg-rose mx-auto mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto" data-testid="services-subtitle">Explore our wide range of ethnic wear categories</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" data-testid="service-categories-grid">
          {SERVICE_CATEGORIES.map((cat) => (
            <div key={cat.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all" data-testid={`service-cat-${cat.id}`}>
              <img src={cat.image} alt={cat.title} className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h4 className="text-xl font-playfair font-semibold mb-1" data-testid={`service-cat-title-${cat.id}`}>{cat.title}</h4>
                <p className="text-sm text-white/80" data-testid={`service-cat-desc-${cat.id}`}>{cat.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="stitching-services-grid">
          {STITCHING_SERVICES.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-pink-100" data-testid={`stitch-service-${s.id}`}>
              <div className="text-rose mb-4">{ICONS[s.id]}</div>
              <h4 className="text-xl font-playfair font-semibold mb-3 text-gray-900">{s.title}</h4>
              <p className="text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
