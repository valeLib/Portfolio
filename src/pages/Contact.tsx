import { useState } from 'react';
import { Section } from '../components/layout';
import { SocialIcon } from '../components/ui';
import { useDocumentTitle, useGsapReveal } from '../hooks';
import { socials, contactEmail } from '../content/socials';
import { profile } from '../content/profile';

export function Contact() {
  useDocumentTitle('Contact');
  const headerRef = useGsapReveal<HTMLDivElement>();
  const formRef = useGsapReveal<HTMLDivElement>({ delay: 0.2 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(
      subject || 'Portfolio Contact'
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {/* Header */}
      <Section className="page-safe-top pb-8">
        <div ref={headerRef} className="max-w-3xl">
          <div data-gsap-reveal className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500/10 border border-accent-500/20 rounded-full text-accent-400 text-sm font-medium">
              <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
              {profile.availability}
            </span>
          </div>

          <h1 data-gsap-reveal className="heading-1 mb-4" style={{ color: 'var(--text-heading)' }}>
            Get in <span className="text-gradient">Touch</span>
          </h1>

          <p data-gsap-reveal className="text-xl text-dark-400">
            Have a project in mind or want to discuss opportunities?
            I'd love to hear from you.
          </p>
        </div>
      </Section>

      {/* Contact Content */}
      <Section className="pt-0">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div ref={formRef}>
            <div data-gsap-reveal className="glass-card p-6 md:p-8">
              <h2 className="heading-4 mb-6" style={{ color: 'var(--text-heading)' }}>Send a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-dark-300 text-sm font-medium mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-dark-300 text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-dark-300 text-sm font-medium mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Project inquiry, collaboration, etc."
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-dark-300 text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input-field resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send Message
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </form>

              <p className="text-dark-500 text-xs text-center mt-4">
                This will open your email client to send the message.
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <div data-gsap-reveal className="mb-8">
              <h2 className="heading-4 mb-4" style={{ color: 'var(--text-heading)' }}>Direct Contact</h2>
              <a
                href={`mailto:${contactEmail}`}
                className="group flex items-center gap-3 text-dark-300 transition-colors"
                style={{ ['--hover-color' as string]: 'var(--text-heading)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-heading)'}
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
              >
                <div className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center group-hover:bg-accent-500/20 transition-colors">
                  <SocialIcon name="email" className="w-5 h-5" />
                </div>
                <span>{contactEmail}</span>
              </a>
            </div>

            <div data-gsap-reveal className="mb-8">
              <h2 className="heading-4 mb-4" style={{ color: 'var(--text-heading)' }}>Location</h2>
              <p className="text-dark-400">{profile.location}</p>
            </div>

            <div data-gsap-reveal>
              <h2 className="heading-4 mb-4" style={{ color: 'var(--text-heading)' }}>Connect</h2>
              <div className="flex flex-wrap gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-700 hover:border-accent-500/30 hover:bg-dark-800 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center group-hover:bg-accent-500/20 transition-colors">
                      <SocialIcon name={social.icon} className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium" style={{ color: 'var(--text-heading)' }}>{social.name}</p>
                      <p className="text-dark-500 text-xs">{social.username}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability note */}
            <div data-gsap-reveal className="mt-8 p-4 rounded-xl bg-accent-500/10 border border-accent-500/20">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent-400 rounded-full mt-2 animate-pulse" />
                <div>
                  <p className="text-accent-400 font-medium mb-1">
                    Currently {profile.availability.toLowerCase()}
                  </p>
                  <p className="text-dark-400 text-sm">
                    I typically respond within 24-48 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
