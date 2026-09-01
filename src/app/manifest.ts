import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Warm Wishes | Luxury Handcrafted Gifts',
    short_name: 'Warm Wishes',
    description: 'Thoughtfully crafted candles, chocolates and handmade soaps designed to create memorable gifting experiences.',
    start_url: '/',
    scope: '/',
    id: 'https://the-warm-wishes-company.vercel.app/',
    display: 'standalone',
    background_color: '#141210',
    theme_color: '#141210',
    orientation: 'portrait',
    protocol_handlers: [
      {
        protocol: 'web+warmwishes',
        url: '/?launch=%s',
      },
    ],
    icons: [
      {
        src: '/images/logo.png?v=3',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/logo.png?v=3',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/logo.png?v=3',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
