import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export function ContactForm() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
    <div className="bg-blush rounded-2xl p-8 shadow-lg border border-pink-100" data-testid="contact-form-card">
      <h3 className="text-xl font-playfair font-semibold mb-2 text-gray-900">Send us a Message</h3>
      <p className="text-gray-600 mb-6 text-sm">Our expert tailors are ready to help you.</p>
      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm" data-testid="success-message">
          Thank you! We'll contact you soon.
        </div>
      )}
      <form onSubmit={handleSubmit} data-testid="contact-form">
        <div className="space-y-4">
          <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-rose bg-white" data-testid="contact-name-input" />
          <input type="tel" placeholder="Your Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-rose bg-white" data-testid="contact-phone-input" />
          <textarea placeholder="Your Message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows="4" className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-rose bg-white" data-testid="contact-message-input" />
          <button type="submit" disabled={isSubmitting} className="w-full bg-rose text-white py-3 rounded-lg font-medium hover:brightness-110 transition-all disabled:opacity-50" data-testid="contact-submit-button">
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
}
