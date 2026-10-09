import { useId, useState, type FormEvent } from 'react';
import { AlertCircle, Mail } from 'lucide-react';

export type ComposerErrors = Partial<Record<'name' | 'email' | 'message', string>>;

export function validateComposer(v: { name: string; email: string; message: string }): ComposerErrors {
  const errors: ComposerErrors = {};
  if (v.name.trim().length < 2) errors.name = 'Enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) errors.email = 'Enter a valid email address.';
  if (v.message.trim().length < 10) errors.message = 'Write a short message (at least 10 characters).';
  return errors;
}

export function buildMailto(to: string, subject: string, v: { name: string; email: string; message: string }): string {
  const body = `${v.message.trim()}\n\n${v.name.trim()}\n${v.email.trim()}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const openMail = (url: string) => {
  window.location.href = url;
};

type Props = {
  to: string;
  topics: string[];
  topicLabel: string;
  subjectPrefix: string;
  submitLabel?: string;
  /** Hands the prepared mailto: URL to the browser. Replaceable so tests can observe it. */
  onOpen?: (url: string) => void;
};

/**
 * A form that prepares an email in the visitor's own mail app. The site itself sends and stores nothing,
 * which is why it can ship as a concept without a back end. A production site would post to a form service.
 */
export function MailComposer({ to, topics, topicLabel, subjectPrefix, submitLabel = 'Open in my email app', onOpen = openMail }: Props) {
  const uid = useId();
  const [v, setV] = useState({ name: '', email: '', topic: topics[0], message: '' });
  const [errors, setErrors] = useState<ComposerErrors>({});
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => {
    setV((s) => ({ ...s, [k]: e.target.value }));
    setDone(false);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validateComposer(v);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onOpen(buildMailto(to, `${subjectPrefix}: ${v.topic}`, v));
    setDone(true);
  };

  const err = (k: keyof ComposerErrors) =>
    errors[k] ? (
      <p className="error" id={`${uid}-${k}-e`} role="alert">
        <AlertCircle aria-hidden="true" /> {errors[k]}
      </p>
    ) : null;

  return (
    <form className="card form-grid two" onSubmit={onSubmit} noValidate aria-label="Message form">
      <div className="field">
        <label htmlFor={`${uid}-name`}>Your name</label>
        <input id={`${uid}-name`} className="input" autoComplete="name" value={v.name} onChange={set('name')} aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? `${uid}-name-e` : undefined} />
        {err('name')}
      </div>
      <div className="field">
        <label htmlFor={`${uid}-email`}>Email</label>
        <input id={`${uid}-email`} type="email" className="input" autoComplete="email" value={v.email} onChange={set('email')} aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? `${uid}-email-e` : undefined} />
        {err('email')}
      </div>
      <div className="field span-2">
        <label htmlFor={`${uid}-topic`}>{topicLabel}</label>
        <select id={`${uid}-topic`} className="select" value={v.topic} onChange={set('topic')}>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="field span-2">
        <label htmlFor={`${uid}-msg`}>Message</label>
        <textarea id={`${uid}-msg`} className="textarea" value={v.message} onChange={set('message')} aria-invalid={errors.message ? true : undefined} aria-describedby={errors.message ? `${uid}-message-e` : undefined} />
        {err('message')}
      </div>
      <div className="span-2" style={{ display: 'grid', gap: 12 }}>
        <button type="submit" className="btn btn-lg">
          <Mail aria-hidden="true" /> {submitLabel}
        </button>
        <p className="fine" role="status">
          {done
            ? `Your email app should have opened with the message ready to send to ${to}. Nothing was sent from this page.`
            : `This prepares an email to ${to} in your own mail app. This page sends and stores nothing.`}
        </p>
      </div>
    </form>
  );
}
