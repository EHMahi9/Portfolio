import React, { useState } from 'react';

export const Contact: React.FC = () => {
  // Form input state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '' // Honeypot field
  });

  // Validation error state for each field
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Submission status message and type
  const [statusMessage, setStatusMessage] = useState('');
  const [isErrorStatus, setIsErrorStatus] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field validation rules matching vanilla contact.js
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim().length >= 2 ? '' : 'Please enter your name.';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
          ? ''
          : 'Please enter a valid email address.';
      case 'subject':
        return value.trim().length >= 3 ? '' : 'Please add a short subject.';
      case 'message':
        return value.trim().length >= 15 ? '' : 'Please write at least 15 characters.';
      default:
        return '';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error while typing if previously invalid
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'website') return;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      subject: validateField('subject', formData.subject),
      message: validateField('message', formData.message)
    };

    setErrors(newErrors);

    // If any error exists, block submission
    const hasErrors = Object.values(newErrors).some((msg) => msg !== '');
    if (hasErrors) {
      setIsErrorStatus(true);
      setStatusMessage('Please fix the highlighted fields.');
      return;
    }

    setIsSubmitting(true);
    setIsErrorStatus(false);
    setStatusMessage('Sending your message...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send your message right now.');
      }

      setIsErrorStatus(false);
      setStatusMessage(result.message || 'Thanks - your message has been received.');
      setFormData({ name: '', email: '', subject: '', message: '', website: '' });
      setErrors({});
    } catch (err: unknown) {
      setIsErrorStatus(true);
      if (err instanceof Error) {
        setStatusMessage(err.message);
      } else {
        setStatusMessage('Unable to send your message right now.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-pad contact-section" id="contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        {/* Contact Copy & Direct Methods */}
        <div className="contact-copy">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Let's talk about internships, junior roles, or project ideas.</h2>
          <p>
            I am open to opportunities where I can contribute, learn from experienced
            engineers, and keep improving through real product work.
          </p>

          <div className="contact-methods">
            <a href="mailto:vaibongo20@gmail.com">
              <span>Email</span>
              <strong>vaibongo20@gmail.com</strong>
            </a>
            <a
              href="https://github.com/EHMahi9"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>GitHub</span>
              <strong>github.com/EHMahi9</strong>
            </a>
            <a
              href="https://www.linkedin.com/in/ebnul-hasan-mahi-580b07395/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>LinkedIn</span>
              <strong>Connect on LinkedIn</strong>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <form className="contact-form" id="contactForm" noValidate onSubmit={handleSubmit}>
          {/* Honeypot field (hidden from real users) */}
          <div className="form-row form-honeypot" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          {/* Name Field */}
          <div className={`form-row ${errors.name ? 'is-invalid' : ''}`}>
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              aria-describedby="nameError"
              aria-invalid={Boolean(errors.name)}
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <small id="nameError" className="form-error" aria-live="polite">
              {errors.name}
            </small>
          </div>

          {/* Email Field */}
          <div className={`form-row ${errors.email ? 'is-invalid' : ''}`}>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-describedby="emailError"
              aria-invalid={Boolean(errors.email)}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <small id="emailError" className="form-error" aria-live="polite">
              {errors.email}
            </small>
          </div>

          {/* Subject Field */}
          <div className={`form-row ${errors.subject ? 'is-invalid' : ''}`}>
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              minLength={3}
              aria-describedby="subjectError"
              aria-invalid={Boolean(errors.subject)}
              value={formData.subject}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <small id="subjectError" className="form-error" aria-live="polite">
              {errors.subject}
            </small>
          </div>

          {/* Message Field */}
          <div className={`form-row ${errors.message ? 'is-invalid' : ''}`}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              minLength={15}
              aria-describedby="messageError"
              aria-invalid={Boolean(errors.message)}
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
            ></textarea>
            <small id="messageError" className="form-error" aria-live="polite">
              {errors.message}
            </small>
          </div>

          {/* Submit Button */}
          <button className="button button-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Prepare email'}
          </button>

          {/* Status Message */}
          <p
            className={`form-status ${isErrorStatus ? 'is-error' : ''}`}
            id="formStatus"
            role="status"
            aria-live="polite"
          >
            {statusMessage}
          </p>
        </form>
      </div>
    </section>
  );
};
