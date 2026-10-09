import React, { useState } from 'react';
import { Send, CheckCircle, MessageSquare, ShieldCheck } from 'lucide-react';
import { useStudioStore } from '../../store/studioStore';

export const ContactPage: React.FC = () => {
  const { setCursor } = useStudioStore();
  const [topic, setTopic] = useState('SUPPORT');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const topics = ['SUPPORT', 'PARTNERSHIP', 'PRESS', 'EDUCATION', 'BUSINESS', 'OTHER'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div
      style={{
        backgroundColor: '#0D0E11',
        color: '#F1EFE9',
        minHeight: '100vh',
        padding: 'calc(var(--header-height) + 48px) clamp(20px, 5vw, 64px) 100px'
      }}
    >
      <div style={{ maxWidth: '840px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--cyan)', letterSpacing: '0.12em', marginBottom: '8px' }}>
            [DIRECT DISPATCH LINE]
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 110px)', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: '16px', color: '#FFFFFF' }}>
            SOMETHING<br />NOT SPINNING?
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '19px', color: 'var(--studio-muted)', maxWidth: '580px', lineHeight: 1.5 }}>
            Reach out to our engineering and product team for vector extrusion questions, custom enterprise web embed runtimes, or license questions.
          </p>
        </div>

        {/* Contact Form Box */}
        <div
          style={{
            backgroundColor: 'var(--studio-panel)',
            border: '1px solid var(--studio-border)',
            padding: 'clamp(28px, 5vw, 48px)',
            position: 'relative'
          }}
          className="corner-tick"
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(99, 230, 226, 0.15)',
                  border: '1px solid var(--cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}
              >
                <CheckCircle size={32} color="var(--cyan)" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#FFFFFF', marginBottom: '8px' }}>
                DISPATCH TRANSMITTED.
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--studio-muted)', marginBottom: '24px' }}>
                Ticket ref #{Math.floor(Math.random() * 89999 + 10000)}. Our team responds within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="btn-secondary"
                style={{ color: '#FFFFFF', borderColor: 'var(--studio-border)' }}
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Topic Selector */}
              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--cyan)', display: 'block', marginBottom: '10px', fontWeight: 700 }}>
                  TOPIC
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {topics.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      style={{
                        padding: '8px 14px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        fontWeight: 600,
                        backgroundColor: topic === t ? 'var(--cyan)' : 'var(--studio-bg)',
                        color: topic === t ? '#111111' : 'var(--studio-muted)',
                        border: '1px solid var(--studio-border)'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="contact-inputs-grid">
                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--studio-muted)', display: 'block', marginBottom: '6px' }}>
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Chen"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      backgroundColor: 'var(--studio-bg)',
                      border: '1px solid var(--studio-border)',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--studio-muted)', display: 'block', marginBottom: '6px' }}>
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@studio.design"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      backgroundColor: 'var(--studio-bg)',
                      border: '1px solid var(--studio-border)',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px'
                    }}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--studio-muted)', display: 'block', marginBottom: '6px' }}>
                  MESSAGE DETAILS
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what you're building, reporting, or requesting..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    backgroundColor: 'var(--studio-bg)',
                    border: '1px solid var(--studio-border)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="btn-machine"
                  style={{ backgroundColor: 'var(--cyan)', color: '#111111', width: '100%', padding: '16px' }}
                >
                  <Send size={15} />
                  <span>TRANSMIT MESSAGE</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .contact-inputs-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
