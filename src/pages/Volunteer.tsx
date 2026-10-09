import { PageHero } from '../components/PageHero';
import { MailComposer } from '../components/MailComposer';
import { ContentGap } from '../components/Notices';
import { CONTACT } from '../content/org';
import { PROGRAM_GROUPS } from '../content/programs';
import { usePageMeta } from '../lib/usePageMeta';

export default function Volunteer() {
  usePageMeta('Volunteer', 'Tell the team how you would like to help.');
  return (
    <>
      <PageHero
        title="Volunteer"
        eyebrow="Give your time"
        crumbs={[{ label: 'Get involved', to: '/get-involved' }, { label: 'Volunteer' }]}
        lead="Tell the volunteer team what you can offer and where. They will reply by email."
      />
      <section className="section tight">
        <div className="container split-2 wide-left">
          <MailComposer
            to={CONTACT.emails.volunteers}
            topicLabel="Where would you like to help?"
            topics={[...PROGRAM_GROUPS, 'Digital and design skills', 'Not sure yet']}
            subjectPrefix="Volunteer interest"
            submitLabel="Prepare my email"
          />
          <aside style={{ display: 'grid', gap: 18 }} aria-label="Notes">
            <ContentGap>
              The original Volunteer page does not describe roles, time commitments or locations. Add them here, with a short “what to expect”
              section, to turn interest into sign-ups.
            </ContentGap>
          </aside>
        </div>
      </section>
    </>
  );
}
