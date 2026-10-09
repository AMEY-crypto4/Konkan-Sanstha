import { useEffect, useState } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { CONTACT } from '../content/org';

export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <aside className="floating" aria-label="Quick actions">
      <button
        type="button"
        className={`fab top${show ? ' show' : ''}`}
        aria-label="Back to top"
        tabIndex={show ? 0 : -1}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp aria-hidden="true" />
      </button>
      <a className="fab whatsapp" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp (opens in a new tab)">
        <MessageCircle aria-hidden="true" />
      </a>
    </aside>
  );
}
