import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { eyebrow } from '@/lib/styles';

const NAV_LINKS = [
  { href: '#journey', label: 'How It Works' },
  { href: '#experience', label: 'The Experience' },
  { href: '#community', label: 'Community' },
  { href: '#early-access', label: 'Early Access' },
  { href: '#faq', label: 'FAQ' },
];

const LEGAL_LINKS = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-lotus-blush bg-lotus-ivory">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 sm:px-10 md:grid-cols-12 lg:px-16">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-6 max-w-xs text-xl font-medium leading-snug text-lotus-brown">
            A more intentional way to find love.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 md:col-span-7 md:grid-cols-3">
          <div>
            <p className={eyebrow}>Explore</p>
            <ul className="mt-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-lotus-plum transition-colors duration-300 hover:text-lotus-mauve">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={eyebrow}>Legal</p>
            <ul className="mt-6 space-y-4">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-lotus-plum transition-colors duration-300 hover:text-lotus-mauve">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={eyebrow}>Social</p>
            <ul className="mt-6 space-y-4">
              <li className="text-sm text-lotus-plum">Instagram</li>
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-lotus-mauve">
              Official social channels will be listed here once they are available.
            </p>
          </div>
        </nav>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 border-t border-lotus-blush px-6 py-8 text-xs text-lotus-mauve sm:flex-row sm:items-center sm:px-10 lg:px-16">
        <p>&copy; {new Date().getFullYear()} EqualSpace. All rights reserved.</p>
        <p>Early access preview. Launch details will be shared as they are confirmed.</p>
      </div>
    </footer>
  );
}
