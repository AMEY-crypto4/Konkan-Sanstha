import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { DonationWidget, impactLine } from '../components/DonationWidget';
import { RoleBrowser } from '../components/RoleBrowser';
import { Accordion } from '../components/Accordion';
import { CountUp } from '../components/CountUp';
import { ImpactCalculator } from '../components/ImpactCalculator';
import { MailComposer, buildMailto, validateComposer } from '../components/MailComposer';
import { DataTableView } from '../components/DataTableView';
import { ALL_ROLES } from '../content/careers';

const Where = () => <p data-testid="where">{useLocation().pathname + useLocation().search}</p>;

describe('impactLine', () => {
  it('describes what a gift could fund', () => expect(impactLine(1000)).toBe('25 nutritious meals or 4 pairs of school shoes'));
  it('is null when nothing is affordable or no amount is set', () => {
    expect(impactLine(10)).toBeNull();
    expect(impactLine(null)).toBeNull();
  });
});

describe('DonationWidget', () => {
  const setup = (ui = <DonationWidget variant="page" />) =>
    render(
      <MemoryRouter initialEntries={['/donate']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="*" element={<>{ui}<Where /></>} />
        </Routes>
      </MemoryRouter>,
    );

  it('starts with a preset selected and shows what it could fund', () => {
    setup();
    expect(screen.getByRole('radio', { name: '₹1,000' })).toBeChecked();
    expect(screen.getByText(/could fund roughly/)).toHaveTextContent('₹1,000 could fund roughly 25 nutritious meals or 4 pairs of school shoes.');
  });

  it('updates the impact line when another preset is chosen', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole('radio', { name: '₹5,000' }));
    expect(screen.getByText(/could fund roughly/)).toHaveTextContent('₹5,000 could fund roughly 125 nutritious meals');
  });

  it('switches the footnote between tax and monthly notes', async () => {
    const user = userEvent.setup();
    setup();
    expect(screen.getByText(/80G tax benefit/)).toBeInTheDocument();
    await user.click(screen.getByRole('radio', { name: 'Give monthly' }));
    expect(screen.getByText(/eNACH/)).toBeInTheDocument();
  });

  it('rejects a custom amount below the minimum and explains why', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole('radio', { name: 'Another amount' }));
    const input = screen.getByLabelText('Amount in rupees');
    await user.type(input, '200');
    expect(screen.getByRole('alert')).toHaveTextContent('The minimum gift is ₹500.');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    await user.click(screen.getByRole('button', { name: /review my gift/i }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('accepts formatted custom amounts', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole('radio', { name: 'Another amount' }));
    await user.type(screen.getByLabelText('Amount in rupees'), '₹12,500');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /review my gift/i }));
    expect(screen.getByRole('status')).toHaveTextContent('₹12,500 one time');
  });

  it('review step says nothing is taken and links to the official site', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole('radio', { name: 'Give monthly' }));
    await user.click(screen.getByRole('button', { name: /review my gift/i }));
    const status = screen.getByRole('status');
    expect(status).toHaveTextContent('₹1,000 every month');
    expect(status).toHaveTextContent(/no payment is taken/i);
    expect(within(status).getByRole('link', { name: /official website/i })).toHaveAttribute('href', 'https://www.kokanngo.org/');
  });

  it('collects no sensitive fields', () => {
    setup();
    const names = screen.queryAllByRole('textbox').map((e) => e.getAttribute('name') ?? '');
    expect(names.join()).not.toMatch(/pan|aadhaar|card|password/i);
    expect(screen.queryByLabelText(/pan|aadhaar|card number|password/i)).toBeNull();
  });

  it('card variant hands off to /donate with amount and mode', async () => {
    const user = userEvent.setup();
    setup(<DonationWidget variant="card" />);
    await user.click(screen.getByRole('radio', { name: '₹2,500' }));
    await user.click(screen.getByRole('radio', { name: 'Give monthly' }));
    await user.click(screen.getByRole('button', { name: /continue/i }));
    expect(screen.getByTestId('where')).toHaveTextContent('/donate?amount=2500&mode=monthly');
  });

  it('pre-fills a non-preset amount from the link', () => {
    setup(<DonationWidget variant="page" initialAmount={3750} initialMode="monthly" forLabel="Blanket campaign" />);
    expect(screen.getByRole('radio', { name: 'Another amount' })).toBeChecked();
    expect(screen.getByLabelText('Amount in rupees')).toHaveValue('3750');
    expect(screen.getByRole('radio', { name: 'Give monthly' })).toBeChecked();
    expect(screen.getByText(/Supporting: Blanket campaign/)).toBeInTheDocument();
  });
});

describe('ImpactCalculator', () => {
  it('recalculates as the amount changes', async () => {
    const user = userEvent.setup();
    render(<ImpactCalculator initial={500} />);
    expect(screen.getByText('nutritious meals')).toBeInTheDocument();
    const input = screen.getByLabelText('If you gave');
    await user.clear(input);
    await user.type(input, '10000');
    expect(screen.getAllByRole('listitem').some((li) => li.textContent?.includes('250'))).toBe(true);
  });
  it('flags derived costs and does not crash on bad input', async () => {
    const user = userEvent.setup();
    render(<ImpactCalculator initial={2500} />);
    expect(screen.getAllByText('Worked out').length).toBeGreaterThan(0);
    const input = screen.getByLabelText('If you gave');
    await user.clear(input);
    await user.type(input, 'abc');
    expect(screen.getByText(/valid amount/i)).toBeInTheDocument();
  });
});

describe('RoleBrowser', () => {
  it('lists every role type at first', () => {
    render(<RoleBrowser />);
    expect(screen.getByRole('status')).toHaveTextContent(`Showing ${ALL_ROLES.length} of ${ALL_ROLES.length}`);
  });
  it('filters by search text', async () => {
    const user = userEvent.setup();
    render(<RoleBrowser />);
    await user.type(screen.getByLabelText('Search roles'), 'front-end');
    expect(screen.getByText('Front-End Web Developer')).toBeInTheDocument();
    expect(screen.queryByText('Video Editor')).not.toBeInTheDocument();
  });
  it('filters by department and reflects the pressed state', async () => {
    const user = userEvent.setup();
    render(<RoleBrowser />);
    const chip = screen.getByRole('button', { name: /^Consultant/ });
    await user.click(chip);
    expect(chip).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: /^All/ })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('Legal Consultant')).toBeInTheDocument();
    expect(screen.queryByText('Front-End Web Developer')).not.toBeInTheDocument();
  });
  it('shows an empty state', async () => {
    const user = userEvent.setup();
    render(<RoleBrowser />);
    await user.type(screen.getByLabelText('Search roles'), 'astronaut');
    expect(screen.getByText(/No role types match/)).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Showing 0 of');
  });
  it('gives each Ask link an accessible name and a prefilled subject', () => {
    render(<RoleBrowser />);
    const link = screen.getByRole('link', { name: 'Ask about Front-End Web Developer' });
    expect(link.getAttribute('href')).toContain('subject=Enquiry%3A%20Front-End%20Web%20Developer');
  });
});

describe('Accordion', () => {
  const items = [
    { title: 'One', body: <p>First answer</p> },
    { title: 'Two', body: <p>Second answer</p> },
  ];
  it('opens one panel at a time and wires aria-controls', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} defaultOpen={null} />);
    const [one, two] = screen.getAllByRole('button');
    expect(one).toHaveAttribute('aria-expanded', 'false');
    await user.click(one);
    expect(one).toHaveAttribute('aria-expanded', 'true');
    expect(document.getElementById(one.getAttribute('aria-controls')!)).toHaveClass('open');
    await user.click(two);
    expect(one).toHaveAttribute('aria-expanded', 'false');
    expect(two).toHaveAttribute('aria-expanded', 'true');
  });
  it('collapses an open panel when clicked again', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} defaultOpen={0} />);
    const one = screen.getAllByRole('button')[0];
    await user.click(one);
    expect(one).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('CountUp', () => {
  it('renders the final value on first paint, never zero', () => {
    render(<CountUp value={1470152} />);
    // one visible copy for sighted users, one screen-reader copy: both are the final value
    expect(screen.getAllByText('14,70,152')).toHaveLength(2);
  });
  it('keeps prefix and suffix', () => {
    render(<CountUp value={12} suffix="+" />);
    expect(screen.getAllByText('12+')).toHaveLength(2);
  });
});

describe('MailComposer', () => {
  it('validates required fields', () => {
    expect(validateComposer({ name: '', email: 'x', message: 'short' })).toEqual({
      name: 'Enter your name.',
      email: 'Enter a valid email address.',
      message: 'Write a short message (at least 10 characters).',
    });
    expect(validateComposer({ name: 'Asha', email: 'asha@example.com', message: 'I can help on weekends.' })).toEqual({});
  });
  it('builds an encoded mailto link', () => {
    const url = buildMailto('volunteers@kokanngo.org', 'Volunteer interest: Education', { name: 'Asha', email: 'a@b.co', message: 'Hello & welcome' });
    expect(url.startsWith('mailto:volunteers@kokanngo.org?subject=')).toBe(true);
    expect(url).toContain('Hello%20%26%20welcome');
  });
  it('shows errors and does not open mail when invalid', async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    render(<MailComposer to="a@b.co" topics={['X']} topicLabel="Topic" subjectPrefix="S" onOpen={onOpen} />);
    await user.click(screen.getByRole('button', { name: /open in my email app/i }));
    expect(screen.getAllByRole('alert')).toHaveLength(3);
    expect(onOpen).not.toHaveBeenCalled();
  });
  it('opens mail with the prepared message when valid, and says nothing was sent', async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    render(<MailComposer to="a@b.co" topics={['General', 'Other']} topicLabel="Topic" subjectPrefix="Hi" onOpen={onOpen} />);
    await user.type(screen.getByLabelText('Your name'), 'Asha Rao');
    await user.type(screen.getByLabelText('Email'), 'asha@example.com');
    await user.selectOptions(screen.getByLabelText('Topic'), 'Other');
    await user.type(screen.getByLabelText('Message'), 'I would like to help.');
    await user.click(screen.getByRole('button', { name: /open in my email app/i }));
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onOpen.mock.calls[0][0]).toContain('subject=Hi%3A%20Other');
    expect(screen.getByRole('status')).toHaveTextContent('Nothing was sent from this page');
  });
});

describe('DataTableView', () => {
  it('has a caption, column headers and row headers, and formats money', () => {
    render(<DataTableView table={{ title: 'Plans', columns: ['Plan', '3 months'], rows: [['A', 24000]], money: true }} />);
    expect(screen.getByRole('table', { name: 'Plans' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: '3 months' })).toBeInTheDocument();
    expect(screen.getByRole('rowheader', { name: 'A' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '₹24,000' })).toBeInTheDocument();
  });
  it('is keyboard scrollable', () => {
    render(<DataTableView table={{ title: 'T', columns: ['a'], rows: [['x']] }} />);
    expect(screen.getByRole('region', { name: /scrollable/ })).toHaveAttribute('tabindex', '0');
  });
});

void fireEvent;
