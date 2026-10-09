import { Mail, MessageCircle, Phone } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { MailComposer } from '../components/MailComposer';
import { OfficeCards } from '../components/OfficeCards';
import { CautionNotice } from '../components/Notices';
import { ExternalLink } from '../components/Button';
import { CONTACT, SOCIAL } from '../content/org';
import { usePageMeta } from '../lib/usePageMeta';

export default function Contact() {
  usePageMeta('Contact', 'Phone, email, WhatsApp and office addresses.');
  return (
    <>
      <PageHero title="Contact" eyebrow="Get in touch" crumbs={[{ label: 'Contact' }]} lead="Four offices, one phone line and a team that answers by email and WhatsApp." />
      <section className="section tight">
        <div className="container split-2 wide-left">
          <MailComposer
            to={CONTACT.emails.general}
            topicLabel="What is this about?"
            topics={['A general question', 'Help with a donation', 'Media or press', 'Partnership', 'Adoption enquiry']}
            subjectPrefix="Website enquiry"
          />
          <aside style={{ display: 'grid', gap: 18 }} aria-label="Direct contact">
            <div className="way">
              <Phone aria-hidden="true" color="var(--indigo-700)" />
              <h2 style={{ fontSize: '1.2rem' }}>Phone</h2>
              <p>
                <a href={CONTACT.phone.href}>{CONTACT.phone.display}</a>
                <br />
                Helpline: <a href={CONTACT.helpline.href}>{CONTACT.helpline.display}</a>
              </p>
            </div>
            <div className="way">
              <Mail aria-hidden="true" color="var(--indigo-700)" />
              <h2 style={{ fontSize: '1.2rem' }}>Email</h2>
              <p>
                General: <a href={`mailto:${CONTACT.emails.general}`}>{CONTACT.emails.general}</a>
                <br />
                Volunteers: <a href={`mailto:${CONTACT.emails.volunteers}`}>{CONTACT.emails.volunteers}</a>
                <br />
                Adoption: <a href={`mailto:${CONTACT.emails.adoption}`}>{CONTACT.emails.adoption}</a>
              </p>
            </div>
            <div className="way">
              <MessageCircle aria-hidden="true" color="var(--indigo-700)" />
              <h2 style={{ fontSize: '1.2rem' }}>WhatsApp and social</h2>
              <p>
                <ExternalLink href={CONTACT.whatsapp}>Message on WhatsApp</ExternalLink>
              </p>
              <p>
                {SOCIAL.map((s, i) => (
                  <span key={s.label}>
                    {i ? ' · ' : ''}
                    <ExternalLink href={s.href}>{s.label}</ExternalLink>
                  </span>
                ))}
              </p>
            </div>
          </aside>
        </div>
      </section>
      <section className="section soft tight" aria-labelledby="off-h">
        <div className="container">
          <h2 id="off-h" style={{ marginBottom: 24, fontSize: '1.9rem' }}>
            Offices
          </h2>
          <OfficeCards />
          <div style={{ marginTop: 32 }}>
            <CautionNotice />
          </div>
        </div>
      </section>
    </>
  );
}
