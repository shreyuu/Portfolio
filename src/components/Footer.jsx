import React, { useState, useEffect } from 'react';
import { send, init } from '@emailjs/browser';

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [formStatus, setFormStatus] = useState('');

  // Initialize EmailJS
  const EMAIL_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EMAIL_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const EMAIL_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    if (EMAIL_PUBLIC_KEY) {
      init(EMAIL_PUBLIC_KEY);
    }
  }, [EMAIL_PUBLIC_KEY]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('shreyashmeshram0031@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setFormStatus('');

    try {
      if (!EMAIL_SERVICE_ID || !EMAIL_TEMPLATE_ID || !EMAIL_PUBLIC_KEY) {
        throw new Error('EmailJS configuration is missing');
      }

      await send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        EMAIL_PUBLIC_KEY
      );

      setFormStatus('✓ Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setShowForm(false);
        setFormStatus('');
      }, 2000);
    } catch (error) {
      console.error('Email send error:', error);
      setFormStatus('✗ Failed to send message. Please try again or email directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <footer className="text-center py-6 border-t border-gray-700 text-gray-400 mt-12">
      <p className="mb-2">Have an idea or you&apos;d like some help building?</p>

      <div className="mb-4 space-y-2">
        <div className="flex justify-center gap-4">
          <button
            onClick={copyEmail}
            className="hover:text-white transition-colors text-sm"
            title="Copy email to clipboard"
          >
            {copied ? '✓ Copied!' : 'shreyashmeshram0031@gmail.com'}
          </button>
          <span className="text-gray-600">•</span>
          <button
            onClick={() => setShowForm(!showForm)}
            className="hover:text-white transition-colors text-sm"
            title="Send a message"
          >
            {showForm ? 'Close' : 'Send message'}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleFormSubmit}
            className="mt-4 max-w-md mx-auto space-y-3 bg-gray-900 p-4 rounded-lg"
          >
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleFormChange}
              required
              className="w-full bg-gray-800 text-white px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleFormChange}
              required
              className="w-full bg-gray-800 text-white px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              name="message"
              placeholder="Your message"
              value={formData.message}
              onChange={handleFormChange}
              required
              rows="3"
              className="w-full bg-gray-800 text-white px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white py-2 rounded text-sm transition-colors"
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
            {formStatus && (
              <p className={`text-sm ${formStatus.includes('✓') ? 'text-green-400' : 'text-red-400'}`}>
                {formStatus}
              </p>
            )}
          </form>
        )}
      </div>

      <p>&copy; {new Date().getFullYear()} Shreyash Meshram. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
