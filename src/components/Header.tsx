import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Mail, Menu, Phone, X, Heart, ArrowRight } from 'lucide-react';
import { Brand } from './Brand';
import { Icon } from './icons';
import { ButtonLink } from './Button';
import { NAV, type NavItem } from './nav';
import { CONTACT } from '../content/org';
import { useDismiss, useFocusTrap, useScrollLock } from './useDisclosure';

type Mega = Extract<NavItem, { kind: 'mega' }>;

function MegaPanel({ item, id, onNavigate }: { item: Mega; id: string; onNavigate: () => void }) {
  const cols = item.columns.length;
  return (
    <div className="mega" id={id}>
      <div className="container">
        <div className={`mega-inner${item.feature ? ' with-feature' : ''}`} style={{ ['--cols' as string]: cols }}>
          {item.columns.map((col) => (
            <div key={col.title}>
              <p className="mega-title">{col.title}</p>
              <ul>
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className={`mega-link tone-${l.tone ?? 'indigo'}`} onClick={onNavigate}>
                      <span className="ico">{l.icon ? <Icon name={l.icon} /> : null}</span>
                      <span>
                        <b>{l.label}</b>
                        {l.hint ? <small>{l.hint}</small> : null}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {item.feature ? (
            <div className="mega-feature">
              <p className="mega-title">{item.feature.title}</p>
              <p>{item.feature.body}</p>
              <ButtonLink to={item.feature.cta.to} variant="primary" size="sm" onClick={onNavigate}>
                {item.feature.cta.label} <ArrowRight aria-hidden="true" />
              </ButtonLink>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function DesktopNav() {
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLElement | null>(null);
  const baseId = useId();
  const loc = useLocation();
  const close = useCallback(() => setOpen(null), []);
  useDismiss(ref, open !== null, close);
  useEffect(() => close(), [loc.pathname, close]);

  return (
    <nav className="main-nav" aria-label="Primary" ref={ref}>
      <ul>
        {NAV.map((item) =>
          item.kind === 'link' ? (
            <li key={item.to}>
              <NavLink to={item.to} className="nav-link">
                {item.label}
              </NavLink>
            </li>
          ) : (
            <li key={item.label}>
              <button
                type="button"
                className={`nav-trigger${loc.pathname.startsWith(item.base) ? ' is-active' : ''}`}
                aria-expanded={open === item.label}
                aria-controls={`${baseId}-${item.label}`}
                onClick={() => setOpen(open === item.label ? null : item.label)}
              >
                {item.label} <ChevronDown aria-hidden="true" />
              </button>
              {open === item.label ? <MegaPanel item={item} id={`${baseId}-${item.label}`} onNavigate={close} /> : null}
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}

function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const loc = useLocation();
  useFocusTrap(ref, open);
  useScrollLock(open);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  useEffect(() => onClose(), [loc.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className={`drawer-backdrop${open ? ' open' : ''}`} onClick={onClose} aria-hidden="true" />
      <div
        ref={ref}
        className={`drawer${open ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        // inert keeps closed-drawer links out of the tab order in browsers that support it
        {...(!open ? ({ inert: '' } as object) : {})}
      >
        <div className="drawer-head">
          <Brand onClick={onClose} />
          <button type="button" className="menu-button" onClick={onClose} aria-label="Close menu">
            <X aria-hidden="true" />
          </button>
        </div>
        <nav className="drawer-body" aria-label="Mobile">
          <ul>
            {NAV.map((item) =>
              item.kind === 'link' ? (
                <li key={item.to}>
                  <NavLink to={item.to} className="drawer-link">
                    {item.label}
                  </NavLink>
                </li>
              ) : (
                <li key={item.label}>
                  <button
                    type="button"
                    className="drawer-trigger"
                    aria-expanded={expanded === item.label}
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                  >
                    {item.label} <ChevronDown aria-hidden="true" />
                  </button>
                  {expanded === item.label ? (
                    <div className="drawer-sub">
                      {item.columns.map((c) => (
                        <div key={c.title}>
                          <p className="drawer-sub-title">{c.title}</p>
                          {c.links.map((l) => (
                            <Link key={l.to} to={l.to}>
                              {l.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                      <Link to={item.base} style={{ fontWeight: 700, color: 'var(--indigo-700)' }}>
                        View all
                      </Link>
                    </div>
                  ) : null}
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="drawer-foot">
          <ButtonLink to="/donate" size="lg">
            <Heart aria-hidden="true" /> Donate
          </ButtonLink>
          <a href={CONTACT.phone.href} className="btn btn-ghost">
            <Phone aria-hidden="true" /> {CONTACT.phone.display}
          </a>
        </div>
      </div>
    </>
  );
}

export function Header() {
  const [drawer, setDrawer] = useState(false);
  const closeDrawer = useCallback(() => setDrawer(false), []);
  return (
    <>
      <nav className="utility-bar" aria-label="Contact and information">
        <div className="container">
          <ul>
            <li>
              <a href={CONTACT.phone.href}>
                <Phone aria-hidden="true" /> <span>{CONTACT.phone.display}</span>
              </a>
            </li>
            <li className="hide-xs">
              <a href={`mailto:${CONTACT.emails.general}`}>
                <Mail aria-hidden="true" /> <span>{CONTACT.emails.general}</span>
              </a>
            </li>
          </ul>
          <ul className="utility-right">
            <li>
              <Link to="/transparency">80G tax benefit available</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
      <header className="site-header">
        <div className="container bar">
          <Brand />
          <DesktopNav />
          <ButtonLink to="/donate" className="header-cta" size="sm">
            <Heart aria-hidden="true" /> Donate
          </ButtonLink>
          <button type="button" className="menu-button" onClick={() => setDrawer(true)} aria-label="Open menu" aria-expanded={drawer} aria-haspopup="dialog">
            <Menu aria-hidden="true" />
          </button>
        </div>
      </header>
      <Drawer open={drawer} onClose={closeDrawer} />
    </>
  );
}
