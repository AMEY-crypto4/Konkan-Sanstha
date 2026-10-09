import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Building2, HandHeart, Megaphone, Repeat, Users } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { GIVING } from '../content/org';
import { usePageMeta } from '../lib/usePageMeta';

const WAYS = [
  { icon: HandHeart, t: 'Give once', b: `Choose a programme or a campaign and give from ₹${GIVING.minCustomAmount.toLocaleString('en-IN')}.`, to: '/donate', c: 'Donate' },
  { icon: Repeat, t: 'Give monthly', b: 'A steady gift helps the team plan ahead. Monthly gifts run through eNACH or UPI AutoPay.', to: '/donate?mode=monthly', c: 'Set up monthly giving' },
  { icon: Megaphone, t: 'Support a campaign', b: 'Give to something specific, such as blankets, school kits or sanitary napkins.', to: '/campaigns', c: 'See campaigns' },
  { icon: Users, t: 'Volunteer', b: 'Offer your time and skills. Tell the team what you can do.', to: '/volunteer', c: 'Volunteer' },
  { icon: Building2, t: 'Partner as a company', b: 'CSR partnerships, employee giving and long-term programmes.', to: '/csr', c: 'Corporate partnerships' },
  { icon: Briefcase, t: 'Work with us', b: 'See the types of role the organisation hires for.', to: '/careers', c: 'Careers' },
];

export default function GetInvolved() {
  usePageMeta('Get involved', 'Ways to give, volunteer, partner or work with the organisation.');
  return (
    <>
      <PageHero title="Get involved" eyebrow="Ways to help" crumbs={[{ label: 'Get involved' }]} lead="Whether you have an hour, a gift or a company, there is a way to help." />
      <section className="section tight">
        <div className="container cards-3">
          {WAYS.map((w, i) => (
            <Reveal key={w.t} delay={i % 3}>
              <div className="way">
                <span className="icon-tile tone-indigo">
                  <w.icon aria-hidden="true" />
                </span>
                <h2 style={{ fontSize: '1.3rem' }}>{w.t}</h2>
                <p>{w.b}</p>
                <Link to={w.to} className="link-arrow">
                  {w.c} <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
