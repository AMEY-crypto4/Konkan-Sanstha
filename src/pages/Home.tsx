import { ArrowRight, BadgeCheck, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SunriseArt } from '../components/SunriseArt';
import { ButtonLink } from '../components/Button';
import { DonationWidget } from '../components/DonationWidget';
import { StatGrid } from '../components/CountUp';
import { ProgramCard, CampaignCard } from '../components/ProgramCard';
import { ImpactCalculator } from '../components/ImpactCalculator';
import { Timeline } from '../components/Timeline';
import { Reveal } from '../components/Reveal';
import { CautionNotice } from '../components/Notices';
import { ORG } from '../content/org';
import { HEADLINE, IMPACT_BLOCKS } from '../content/impact';
import { PROGRAMS, programBySlug } from '../content/programs';
import { CAMPAIGNS } from '../content/campaigns';
import { TIMELINE, STORIES } from '../content/about';
import { ACCREDITATIONS, AWARDS } from '../content/transparency';
import { usePageMeta } from '../lib/usePageMeta';

const FEATURED = ['education', 'saksham', 'medical-support', 'village-development', 'feed-one-feed-all', 'wash']
  .map((s) => programBySlug(s))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

const JOURNEY = TIMELINE.filter((t) => ['2010', '2012', '2018', '2021', '2023', '2030'].includes(t.when));
const AWARDS_SHOWN = AWARDS.filter((a) => a.body !== 'Awarding body not stated').slice(0, 3);
const CSR = IMPACT_BLOCKS.find((b) => b.slug === 'csr-partnership')!;

export default function Home() {
  usePageMeta('', 'A concept redesign of a charity website: clearer giving, visible impact and a faster, more accessible experience.');
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <SunriseArt />
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Charitable organisation · Maharashtra and beyond</span>
            <h1 id="hero-title" style={{ marginTop: 18 }}>
              The movement from darkness to <em>light</em>
            </h1>
            <p className="lead">
              Education, child care, health, food, clean water and livelihoods for children, women and families across {ORG.states} states. Choose the
              work you care about and see what your gift can do.
            </p>
            <div className="row">
              <ButtonLink to="/donate" size="lg">
                Donate now
              </ButtonLink>
              <ButtonLink to="/programs" variant="outline-light" size="lg">
                Explore our work <ArrowRight aria-hidden="true" />
              </ButtonLink>
            </div>
            <div className="hero-trust">
              <span>
                <ShieldCheck aria-hidden="true" /> 80G tax benefit on eligible gifts
              </span>
              <span>
                <BadgeCheck aria-hidden="true" /> Registrations and annual reports listed
              </span>
            </div>
          </div>
          <DonationWidget variant="card" />
        </div>
      </section>

      <div className="trust-strip">
        <div className="container">
          <ul aria-label="Registrations listed by the organisation">
            {['80G certificate', '12AB certificate', 'FCRA registration', 'CSR approval', 'NGO Darpan'].map((r) => (
              <li key={r}>
                <BadgeCheck aria-hidden="true" /> {r}
              </li>
            ))}
            <li>
              <small>As listed on the official site</small>
            </li>
          </ul>
        </div>
      </div>

      <section className="section dark" aria-labelledby="impact-title">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Impact</span>
            <h2 id="impact-title">Years of steady work, in numbers</h2>
            <p>Figures are cumulative and reported by the organisation. Programme pages show the detail behind each one.</p>
          </Reveal>
          <StatGrid stats={HEADLINE} cols={4} dark />
          <p style={{ marginTop: 22 }}>
            <Link to="/impact" className="link-arrow">
              See impact by programme <ArrowRight aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="work-title">
        <div className="container">
          <Reveal className="section-head split">
            <div style={{ display: 'grid', gap: 14 }}>
              <span className="eyebrow">Our work</span>
              <h2 id="work-title">Where your support goes</h2>
            </div>
            <p>
              {PROGRAMS.length} programmes, from classrooms and care homes to clean water and hot meals. Each page shows what the work involves,
              what has been achieved and how to help.
            </p>
          </Reveal>
          <div className="bento">
            {FEATURED.map((p, i) => (
              <Reveal key={p.slug} delay={i % 3} className="bento-cell">
                <ProgramCard program={p} feature={i === 0} />
              </Reveal>
            ))}
          </div>
          <p style={{ marginTop: 28 }}>
            <Link to="/programs" className="link-arrow">
              All {PROGRAMS.length} programmes <ArrowRight aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      <section className="section soft" aria-labelledby="calc-title">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Your gift</span>
            <h2 id="calc-title">See what a gift can do</h2>
            <p>Type any amount to see examples built from the costs the organisation publishes.</p>
          </Reveal>
          <ImpactCalculator />
        </div>
      </section>

      <section className="section" aria-labelledby="camp-title">
        <div className="container">
          <Reveal className="section-head split">
            <div style={{ display: 'grid', gap: 14 }}>
              <span className="eyebrow">Campaigns</span>
              <h2 id="camp-title">Give to something specific</h2>
            </div>
            <p>Seasonal and cause-led campaigns list exactly what a gift buys, with the number of people it reaches.</p>
          </Reveal>
          <div className="cards-3">
            {CAMPAIGNS.slice(0, 3).map((c, i) => (
              <Reveal key={c.slug} delay={i}>
                <CampaignCard campaign={c} />
              </Reveal>
            ))}
          </div>
          <p style={{ marginTop: 28 }}>
            <Link to="/campaigns" className="link-arrow">
              All campaigns <ArrowRight aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      <section className="section soft" aria-labelledby="journey-title">
        <div className="container split-2 sticky-first">
          <div>
            <Reveal className="section-head" >
              <span className="eyebrow">Our journey</span>
              <h2 id="journey-title">From a small effort in 2010 to {ORG.states} states</h2>
              <p>
                What began with scholarships and school kits in Maharashtra now includes child care homes, health camps, meals, clean water and
                disaster relief.
              </p>
              <Link to="/about" className="link-arrow">
                Read the full story <ArrowRight aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <Timeline entries={JOURNEY} />
        </div>
      </section>

      <section className="section" aria-labelledby="rec-title">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Trust</span>
            <h2 id="rec-title">Recognised by others</h2>
            <p>Awards and partner platforms as listed by the organisation. Full records are on the transparency page.</p>
          </Reveal>
          <div className="cards-3" style={{ marginBottom: 28 }}>
            {AWARDS_SHOWN.map((a) => (
              <article className="card" key={a.title}>
                <p className="badge" style={{ width: 'fit-content', marginBottom: 12 }}>
                  {a.year}
                </p>
                <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-body)', fontWeight: 650 }}>{a.title}</h3>
                <p style={{ color: 'var(--muted)', marginTop: 6 }}>{a.body}</p>
              </article>
            ))}
          </div>
          <ul className="chips" aria-label="Platforms and networks">
            {ACCREDITATIONS.map((a) => (
              <li className="chip" key={a}>
                {a}
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 28 }}>
            <Link to="/transparency" className="link-arrow">
              Registrations, reports and policies <ArrowRight aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      <section className="section dark" aria-labelledby="csr-title">
        <div className="container split-2">
          <Reveal className="section-head" >
            <span className="eyebrow">Corporate partners</span>
            <h2 id="csr-title">Working with companies on CSR</h2>
            <p>
              The organisation reports working with national and multinational brands on programmes that reach villages and communities.
            </p>
            <ButtonLink to="/csr" variant="primary">
              Partner with us
            </ButtonLink>
          </Reveal>
          <StatGrid stats={CSR.stats} cols={1} dark />
        </div>
      </section>

      <section className="section" aria-labelledby="stories-title">
        <div className="container">
          <Reveal className="section-head split">
            <div style={{ display: 'grid', gap: 14 }}>
              <span className="eyebrow">Stories</span>
              <h2 id="stories-title">Why this work matters</h2>
            </div>
            <p>Articles on the issues behind the programmes: gender, education, health, hunger and inclusion.</p>
          </Reveal>
          <div className="cards-3">
            {STORIES.slice(0, 3).map((s, i) => (
              <Reveal key={s.title} delay={i}>
                <article className="story">
                  <span className="topic">{s.topic}</span>
                  <h3>{s.title}</h3>
                </article>
              </Reveal>
            ))}
          </div>
          <p style={{ marginTop: 28 }}>
            <Link to="/stories" className="link-arrow">
              All stories <ArrowRight aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      <section className="section soft tight" aria-labelledby="involved-title">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Get involved</span>
            <h2 id="involved-title">There is more than one way to help</h2>
          </Reveal>
          <div className="cards-3">
            {[
              { t: 'Donate', b: 'Give once or every month. Gifts from ₹500.', to: '/donate', c: 'Choose a gift' },
              { t: 'Volunteer', b: 'Offer your time and skills to a programme near you.', to: '/volunteer', c: 'Tell us how you can help' },
              { t: 'Work with us', b: 'Roles across digital, projects, accounts, HR and fundraising.', to: '/careers', c: 'Browse role types' },
            ].map((w, i) => (
              <Reveal key={w.t} delay={i}>
                <div className="way">
                  <h3>{w.t}</h3>
                  <p>{w.b}</p>
                  <Link to={w.to} className="link-arrow">
                    {w.c} <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section tight" aria-label="Safety notice">
        <div className="container">
          <CautionNotice />
        </div>
      </section>
    </>
  );
}
