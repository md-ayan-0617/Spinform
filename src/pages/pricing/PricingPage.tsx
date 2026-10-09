import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowUpRight, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useStudioStore } from '../../store/studioStore';

export const PricingPage: React.FC = () => {
  const { setCursor } = useStudioStore();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Do uploads ever leave my browser?',
      a: 'No. SPINFORM operates entirely inside your local browser via WebGL shaders and Web Workers. Vector paths and raster files are parsed directly into client-side GPU memory and never transmitted to any cloud server.'
    },
    {
      q: 'Which input formats are supported?',
      a: 'We support clean SVG vector paths for true geometric extrusion, as well as PNG, JPG, and WebP raster images for alpha contour previews and heightmap extrusions.'
    },
    {
      q: 'Can I use exports commercially?',
      a: 'Yes. All rendered 3D graphics, MP4 videos, WebM transparent loops, and GLB geometry models exported under Creator and Studio licenses include 100% royalty-free commercial usage rights for client campaigns, branding, and apps.'
    },
    {
      q: 'How does the WebM transparent export work?',
      a: 'We use the native browser MediaRecorder API combined with an alpha-enabled WebGL canvas to encode VP9 video tracks containing true alpha transparency, allowing your logo to float seamlessly over website backgrounds.'
    },
    {
      q: 'Does SPINFORM work on mobile phones?',
      a: 'Yes. While the full multi-panel Studio editor is desktop-first, mobile devices support interactive viewing, material switching, animation previewing, and standard resolution exports.'
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Yes. Subscriptions are billed monthly or annually and can be cancelled with a single click inside your account settings with zero cancellation penalties.'
    }
  ];

  return (
    <div
      style={{
        backgroundColor: 'var(--acid)',
        color: 'var(--ink)',
        minHeight: '100vh',
        padding: 'calc(var(--header-height) + 48px) clamp(20px, 5vw, 64px) 100px'
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 800, letterSpacing: '0.12em', marginBottom: '8px' }}>
            [COMMERCIAL LICENSING TIERS]
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 110px)', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            MAKE FOR FREE.<br />
            PAY WHEN YOU NEED MORE.
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '20px', maxWidth: '640px', lineHeight: 1.4 }}>
            Unrestricted access to the real-time browser editor. Upgrade when delivering 4K commercial reels, transparent WebM loops, or enterprise web embeds.
          </p>
        </div>

        {/* Three Horizontal Structured Bands (No generic SaaS cards!) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '72px' }}>
          {/* BAND 1: FREE */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid var(--ink)',
              padding: ' clamp(24px, 4vw, 36px)',
              display: 'grid',
              gridTemplateColumns: '220px 1.4fr auto',
              alignItems: 'center',
              gap: '32px'
            }}
            className="corner-tick pricing-band"
          >
            <div>
              <span className="tech-tag" style={{ marginBottom: '6px' }}>STARTER</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '36px' }}>FREE</h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--graphite)', marginTop: '4px' }}>
                $0 / FOREVER
              </div>
            </div>

            <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--graphite)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div>• Full access to real-time WebGL studio editor</div>
              <div>• Standard materials (Matte White, Obsidian, Basic Clay)</div>
              <div>• 720p PNG stills & standard resolution WebM</div>
              <div>• Up to 3 saved local browser drafts</div>
            </div>

            <div>
              <Link to="/studio" className="btn-secondary" style={{ width: '100%' }}>
                <span>OPEN STUDIO</span>
              </Link>
            </div>
          </div>

          {/* BAND 2: CREATOR */}
          <div
            style={{
              backgroundColor: 'var(--ink)',
              color: '#FFFFFF',
              border: '2px solid var(--ink)',
              padding: ' clamp(24px, 4vw, 36px)',
              display: 'grid',
              gridTemplateColumns: '220px 1.4fr auto',
              alignItems: 'center',
              gap: '32px',
              boxShadow: '6px 6px 0px rgba(0,0,0,0.2)'
            }}
            className="corner-tick pricing-band"
          >
            <div>
              <span className="tech-tag" style={{ backgroundColor: 'var(--acid)', color: 'var(--ink)', marginBottom: '6px' }}>
                MOST POPULAR
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '36px' }}>CREATOR</h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--acid)', marginTop: '4px' }}>
                $12 / MONTH
              </div>
            </div>

            <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#D1D3D8', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div>• All 18+ PBR materials (Mirror Chrome, Optical Glass, 24K Gold)</div>
              <div>• All kinetic choreographies & Bezier easing visualizer</div>
              <div>• 1080p 60FPS MP4 Reels & transparent WebM loops</div>
              <div>• Clean GLB polygon mesh geometry exports</div>
              <div>• No watermarks & commercial license</div>
            </div>

            <div>
              <Link to="/studio" className="btn-machine" style={{ backgroundColor: 'var(--acid)', color: 'var(--ink)', width: '100%' }}>
                <span>START CREATOR</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          {/* BAND 3: STUDIO */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid var(--ink)',
              padding: ' clamp(24px, 4vw, 36px)',
              display: 'grid',
              gridTemplateColumns: '220px 1.4fr auto',
              alignItems: 'center',
              gap: '32px'
            }}
            className="corner-tick pricing-band"
          >
            <div>
              <span className="tech-tag" style={{ marginBottom: '6px' }}>ENTERPRISE & AGENCIES</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '36px' }}>STUDIO</h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--graphite)', marginTop: '4px' }}>
                $29 / MONTH
              </div>
            </div>

            <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--graphite)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div>• Ultra 4K resolution stills (4096 × 4096)</div>
              <div>• Zero-dependency lightweight HTML & React embed codes</div>
              <div>• Custom HDR environment lighting maps</div>
              <div>• Team workspace projects & unlimited IndexedDB sync</div>
            </div>

            <div>
              <Link to="/contact" className="btn-secondary" style={{ width: '100%' }}>
                <span>CONTACT SALES</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div style={{ backgroundColor: '#FFFFFF', border: '2px solid var(--ink)', padding: '32px', marginBottom: '64px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', marginBottom: '24px' }}>
            TECHNICAL CAPABILITIES MATRIX
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--ink)', textAlign: 'left' }}>
                <th style={{ padding: '12px 8px' }}>CAPABILITY</th>
                <th style={{ padding: '12px 8px' }}>FREE</th>
                <th style={{ padding: '12px 8px' }}>CREATOR</th>
                <th style={{ padding: '12px 8px' }}>STUDIO</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Max Still Resolution', free: '720p', creator: '2048px (2K)', studio: '4096px (4K)' },
                { name: 'Video Loop Formats', free: 'Standard WebM', creator: 'MP4 + WebM Alpha', studio: 'All + ProRes Alpha' },
                { name: 'PBR Material Library', free: '3 Basic', creator: 'All 18 Finishes', studio: 'All + Custom Nodes' },
                { name: '3D GLB Exports', free: '—', creator: 'Included', studio: 'Included' },
                { name: 'Interactive Embeds', free: '—', creator: 'Watermarked', studio: 'White-label Clean' },
                { name: 'Offline Processing', free: 'Yes', creator: 'Yes', studio: 'Yes' }
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(17,17,17,0.1)' }}>
                  <td style={{ padding: '14px 8px', fontWeight: 600 }}>{row.name}</td>
                  <td style={{ padding: '14px 8px' }}>{row.free}</td>
                  <td style={{ padding: '14px 8px', fontWeight: 700 }}>{row.creator}</td>
                  <td style={{ padding: '14px 8px', fontWeight: 700, color: 'var(--electric-blue)' }}>{row.studio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQ Accordion */}
        <div style={{ backgroundColor: '#FFFFFF', border: '2px solid var(--ink)', padding: '36px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', marginBottom: '24px' }}>
            FREQUENTLY ANSWERED QUESTIONS
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    border: '1px solid var(--ink)',
                    backgroundColor: isOpen ? 'var(--panel)' : 'transparent',
                    cursor: 'pointer'
                  }}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700 }}>
                      {faq.q}
                    </span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                  {isOpen && (
                    <div style={{ padding: '0 20px 20px', fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--graphite)', lineHeight: 1.5 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .pricing-band {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};
