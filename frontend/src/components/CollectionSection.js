import { GALLERY_DRESSES } from '../constants';

export function CollectionSection() {
  return (
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
              <img src={dress.url} alt={dress.alt} className="w-full h-auto min-h-[320px] object-contain group-hover:scale-105 transition-transform duration-300" data-testid={`dress-image-${dress.id}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
