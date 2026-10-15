import HomeClient from '../components/HomeClient';
import StaticHome from '../components/StaticHome';
import { homeGraph } from '../lib/schema';

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // Server-rendered so crawlers get the entity graph without running JavaScript.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeGraph()) }}
      />
      <HomeClient fallback={<StaticHome />} />
    </>
  );
}
