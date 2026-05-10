import { TESTIMONIALS } from '../constants';

function StarIcon() {
  return (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
    </svg>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 px-4" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4 text-gray-900" data-testid="testimonials-title">What Our Customers Say</h2>
          <div className="w-20 h-1 bg-rose mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-blush rounded-2xl p-6 shadow-lg border border-pink-100" data-testid={`testimonial-${t.id}`}>
              <div className="flex gap-1 mb-3 text-yellow-400" data-testid={`testimonial-stars-${t.id}`}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <StarIcon key={`star-${t.id}-${j}`} />
                ))}
              </div>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed italic" data-testid={`testimonial-text-${t.id}`}>"{t.text}"</p>
              <p className="font-semibold text-gray-900" data-testid={`testimonial-name-${t.id}`}>{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
