import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from '../App';
import { PROGRAMS } from '../content/programs';
import { CAMPAIGNS } from '../content/campaigns';

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppRoutes />
    </MemoryRouter>,
  );

const STATIC: [string, RegExp][] = [
  ['/', /movement from darkness to light/i],
  ['/about', /^Our story$/],
  ['/programs', /^Our work$/],
  ['/campaigns', /^Campaigns$/],
  ['/impact', /^Impact$/],
  ['/get-involved', /^Get involved$/],
  ['/donate', /^Donate$/],
  ['/volunteer', /^Volunteer$/],
  ['/careers', /^Careers$/],
  ['/csr', /^Corporate partnerships$/],
  ['/stories', /^Stories$/],
  ['/transparency', /^Transparency$/],
  ['/contact', /^Contact$/],
  ['/no-such-page', /could not be found/i],
];

describe('routes', () => {
  it.each(STATIC)('%s renders one h1', async (path, name) => {
    renderAt(path);
    const h1 = await screen.findByRole('heading', { level: 1, name });
    expect(h1).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it.each(PROGRAMS.map((p) => [p.slug, p.title]))('programme %s renders', async (slug, title) => {
    renderAt(`/programs/${slug}`);
    expect(await screen.findByRole('heading', { level: 1, name: title })).toBeInTheDocument();
  });

  it.each(CAMPAIGNS.map((c) => [c.slug, c.title]))('campaign %s renders', async (slug, title) => {
    renderAt(`/campaigns/${slug}`);
    expect(await screen.findByRole('heading', { level: 1, name: title })).toBeInTheDocument();
  });

  it('unknown programme and campaign slugs fall back to the 404 page', async () => {
    renderAt('/programs/nope');
    expect(await screen.findByRole('heading', { level: 1, name: /could not be found/i })).toBeInTheDocument();
  });

  it('every page has a skip link, a main landmark and the concept banner', async () => {
    renderAt('/about');
    await screen.findByRole('heading', { level: 1 });
    expect(screen.getByRole('link', { name: /skip to main content/i })).toHaveAttribute('href', '#main');
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: /about this site/i })).toHaveTextContent(/unofficial/i);
  });

  it('flags programmes with no source content', async () => {
    renderAt('/programs/access-to-justice');
    expect(await screen.findByRole('complementary', { name: /content needed/i })).toBeInTheDocument();
  });

  it('prefills the donate page from the query string', async () => {
    renderAt('/donate?amount=3750&mode=monthly&for=Blanket%20campaign');
    expect(await screen.findByLabelText('Amount in rupees')).toHaveValue('3750');
    expect(screen.getByText(/Supporting: Blanket campaign/)).toBeInTheDocument();
  });
});
