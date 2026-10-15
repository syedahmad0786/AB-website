'use client';

// The interactive page (./Home) reads window size, the clock and localStorage while rendering,
// so it mounts on the client only. Until its chunk has loaded, the server-rendered StaticHome
// (passed in from app/page.jsx) is on screen; it is also what crawlers read.
import { createContext, useContext } from 'react';
import dynamic from 'next/dynamic';

const FallbackContext = createContext(null);

function Loading() {
  return useContext(FallbackContext);
}

const Home = dynamic(() => import('./Home'), { ssr: false, loading: Loading });

export default function HomeClient({ fallback }) {
  return (
    <FallbackContext.Provider value={fallback}>
      <Home />
    </FallbackContext.Provider>
  );
}
