import { OWNER_IMAGE } from '../constants';

export function AboutSection() {
  return (
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
  );
}
