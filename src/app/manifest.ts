import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Warm Wishes | Luxury Handcrafted Gifts',
    short_name: 'Warm Wishes',
    description: 'Thoughtfully crafted candles, chocolates and handmade soaps designed to create memorable gifting experiences.',
    start_url: '/',
    display: 'standalone',
    background_color: '#141210',
    theme_color: '#141210',
    orientation: 'portrait',
    icons: [
      {
        src: '/images/logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
