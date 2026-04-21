import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api.js";
import AppShell from "../components/ui/AppShell.jsx";
import { Card, EmptyState } from "../components/ui/primitives.jsx";

const CollectionCard = ({ card }) => {
  return (
    <Card className="flex flex-col justify-around gap-3 p-3">
      <div className="ui-surface aspect-[16/10] overflow-hidden p-2">
        <img
          src={card.preview_image}
          alt={`${card.title} preview`}
          loading="lazy"
          className="h-full w-full object-contain"
          width="640"
          height="400"
        />
      </div>

      <div className="space-y-1 text-sm">
        <h2 className="text-base font-semibold text-[var(--text-0)]">{card.title}</h2>
        <p className="ui-muted">Collection: {card.collection_name}</p>
        <p className="ui-muted">Credits: {card.credits_to}</p>
        <a
          href={card.follow}
          className="ui-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${card.credits_to} profile`}
        >
          Creator Profile
        </a>
      </div>

      <Link
        to={`/collection/${card.goto}`}
        className="ui-control ui-focus ui-button-primary mt-2 inline-flex items-center justify-center px-3 py-2 text-sm font-medium"
        aria-label={`Explore ${card.title}`}
      >
        Explore
      </Link>
    </Card>
  );
};

const ThemeCollection = () => {
  const [themeCollectionData, setThemeCollection] = useState(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await api.get("/api/meta/collection");
        setThemeCollection(res.data || []);
        console.log(res);
        
      } catch {
        setThemeCollection([]);
      }
    };

    fetchCollection();
  }, []);

  return (
    <AppShell
      title="Theme Collection"
      description="Browse all available customization modules and open a specific collection."
    >
      {themeCollectionData?.length ? (
        <section className="ui-card-grid" aria-label="Theme collection list">
          {themeCollectionData.map((card) => (
            <CollectionCard key={card.id} card={card} />
          ))}
        </section>
      ) : (
        <EmptyState title="No Collections Found" description="No collection metadata was returned by the API." />
      )}
    </AppShell>
  );
};

export default ThemeCollection;
