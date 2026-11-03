'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { ctaPrimary } from '@/lib/styles';

const NAV_LINKS = [
  { href: '#philosophy', label: 'Our Philosophy' },
  { href: '#experience', label: 'The Experience' },
  { href: '#journey', label: 'How It Works' },
  { href: '#matching', label: 'Matching' },
  { href: '#trust', label: 'Trust' },
  { href: '#community', label: 'Community' },
];

const SECTION_IDS = ['philosophy', 'experience', 'compatibility', 'matching', 'community'];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const probe = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= probe) current = id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? 'border-b border-lotus-blush/70 bg-lotus-ivory/85 shadow-[0_10px_30px_-18px_rgba(114,84,93,0.35)] backdrop-blur-md'
          : 'border-b border-lotus-blush/50 bg-lotus-ivory/70 backdrop-blur-md'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-16"
      >
        <a href="#top" onClick={closeMenu} aria-label="EqualSpace home" className="shrink-0">
          <Logo />
        </a>

        <ul className="hidden items-center gap-6 xl:flex">
          {NAV_LINKS.map((link) => {
            const id = link.href.slice(1);
            const isActive = activeId === id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative whitespace-nowrap py-2 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-lotus-muted after:transition-transform after:duration-500 hover:text-lotus-mauve hover:after:scale-x-100 ${
                    isActive ? 'text-lotus-mauve after:scale-x-100' : 'text-lotus-plum'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4">
          <a href="#early-access" className={`${ctaPrimary} hidden whitespace-nowrap px-6 py-3 xl:inline-flex`}>
            Get early access
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-lotus-muted/60 bg-lotus-white/80 text-lotus-plum transition-colors duration-300 hover:bg-lotus-petal xl:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 top-[76px] z-40 bg-lotus-ivory transition-all duration-500 xl:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="flex h-full flex-col justify-between px-6 pb-12 pt-10">
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link, index) => (
              <li
                key={link.href}
                className={`border-b border-lotus-blush/70 transition-all duration-500 ${
                  menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: menuOpen ? `${120 + index * 70}ms` : '0ms' }}
              >
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block py-5 font-serif text-3xl font-medium text-lotus-brown"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#early-access" onClick={closeMenu} className={`${ctaPrimary} w-full`}>
            Get early access
          </a>
        </div>
      </div>
    </>
  );
}
