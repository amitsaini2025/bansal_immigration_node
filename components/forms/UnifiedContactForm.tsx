'use client';

import React, { useState } from 'react';
import PhoneField from '@/components/forms/PhoneField';

interface UnifiedContactFormProps {
  formSource?: string;
  formVariant?: 'standard' | 'full' | 'compact' | 'call_back' | 'celebrity';
  showPhone?: boolean;
  showSubject?: boolean;
  formTitle?: string;
  formSubtitle?: string;
}

export default function UnifiedContactForm({
  formSource = 'default',
  formVariant = 'standard',
  showPhone = true,
  showSubject = true,
  formTitle = 'Request Call Back',
  formSubtitle,
}: UnifiedContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [dial, setDial] = useState('+61');
  const [national, setNational] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setResponseMsg('');

    try {
      const res = await fetch('/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          form_source: formSource,
          form_variant: formVariant,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== false) {
        setStatus('success');
        setResponseMsg(data.message || 'Thank you! Your message has been sent successfully. We will contact you soon.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setNational('');
      } else {
        setStatus('error');
        setResponseMsg(data.message || 'There was an error submitting your request. Please try again or call us directly.');
      }
    } catch {
      setStatus('error');
      setResponseMsg('Unable to connect to the server. Please call us directly at +61 3 9602 1330.');
    }
  };

  return (
    <div className="unified-contact-form-container">
      {formTitle && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{formTitle}</h3>
          {formSubtitle && <p className="text-sm text-gray-600 mt-1">{formSubtitle}</p>}
        </div>
      )}

      {status === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {responseMsg}
        </div>
      )}
      {status === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {responseMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-brand-600 transition-colors"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address {formVariant !== 'call_back' && <span className="text-red-500">*</span>}
          </label>
          <input
            type="email"
            required={formVariant !== 'call_back'}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-brand-600 transition-colors"
            placeholder="Enter your email address"
          />
        </div>

        {showPhone && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <PhoneField
              id={`ucf-phone-${formSource}`}
              required
              dial={dial}
              onDialChange={(d) => {
                setDial(d);
                setFormData((f) => ({ ...f, phone: f.phone ? `${d} ${national}` : '' }));
              }}
              value={national}
              onValueChange={(v) => {
                setNational(v);
                setFormData((f) => ({ ...f, phone: v ? `${dial} ${v}` : '' }));
              }}
              selectClassName="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-brand-600 focus:border-brand-600"
              inputClassName="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-brand-600 transition-colors"
            />
          </div>
        )}

        {showSubject && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject {!['compact', 'call_back', 'celebrity'].includes(formVariant) && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              required={!['compact', 'call_back', 'celebrity'].includes(formVariant)}
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-brand-600 transition-colors"
              placeholder="What can we help you with?"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={5}
            maxLength={5000}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-brand-600 transition-colors resize-vertical"
            placeholder="Please describe your inquiry in detail..."
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-brand-700 text-white py-3 px-6 rounded-lg hover:bg-brand-800 focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
}
