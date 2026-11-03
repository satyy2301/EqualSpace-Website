import './globals.css';
import type { Metadata } from 'next';

const fontStyles = {
  '--font-serif': "'Cormorant Garamond', Georgia, serif",
  '--font-sans': "'Nunito Sans', system-ui, sans-serif",
} as React.CSSProperties;

const title = 'EqualSpace | Where genuine love blooms, naturally';
const description =
  'EqualSpace is an intentional dating experience built around emotional compatibility, mutual respect, and meaningful connection. Reserve your early access.';
const image = 'https://images.pexels.com/photos/5163532/pexels-photo-5163532.jpeg?auto=compress&cs=tinysrgb&w=1200';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: image }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [image],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={fontStyles}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Nunito+Sans:wght@400;600;700&display=swap"
        />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-lotus-ivory font-sans text-lotus-plum antialiased">
        {children}
      </body>
    </html>
  );
}
