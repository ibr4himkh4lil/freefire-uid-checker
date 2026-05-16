import './globals.css';

export const metadata = {
  title: 'FF UID Checker — Free Fire Player Lookup',
  description:
    'Instantly check any Free Fire player profile by UID. View nickname, avatar, and region. Fast, free, and accurate Free Fire player lookup tool.',
  keywords: [
    'Free Fire UID checker',
    'FF player lookup',
    'Garena Free Fire',
    'check Free Fire ID',
    'Free Fire nickname checker',
    'FF UID search',
  ].join(', '),
  authors: [{ name: 'FF UID Checker' }],
  themeColor: '#FF6B00',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'FF UID Checker — Free Fire Player Lookup',
    description: 'Check any Free Fire player profile by UID instantly.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FF UID Checker — Free Fire Player Lookup',
    description: 'Check any Free Fire player profile by UID instantly.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎮</text></svg>" />
      </head>
      <body className="antialiased noise-overlay">{children}</body>
    </html>
  );
}
