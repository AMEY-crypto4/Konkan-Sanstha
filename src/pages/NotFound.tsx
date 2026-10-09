import { PageHero } from '../components/PageHero';
import { ButtonLink } from '../components/Button';
import { usePageMeta } from '../lib/usePageMeta';

export default function NotFound() {
  usePageMeta('Page not found');
  return (
    <>
      <PageHero title="This page could not be found" eyebrow="404" lead="The link may be old or mistyped. Try one of these instead." />
      <section className="section tight">
        <div className="container row">
          <ButtonLink to="/">Go to the home page</ButtonLink>
          <ButtonLink to="/programs" variant="ghost">
            Our work
          </ButtonLink>
          <ButtonLink to="/donate" variant="ghost">
            Donate
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
