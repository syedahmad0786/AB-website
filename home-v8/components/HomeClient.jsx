'use client';

// The page reads window size, the clock and localStorage while rendering, so it
// renders on the client only. Metadata and fonts are still served from the server.
import dynamic from 'next/dynamic';

const Home = dynamic(() => import('./Home'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '100vh', background: '#ECE8DF' }} />,
});

export default function HomeClient() {
  return <Home />;
}
