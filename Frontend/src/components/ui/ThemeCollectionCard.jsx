import { useTheme } from "../../context/ThemeContext.jsx";
import { useNavigate } from "react-router-dom";
import {
  applyOmarchyTheme,
  changeWaybarTheme,
  changeWalkerTheme,
  changeHyprlockTheme,
  changeFastfetchTheme,
} from "../../utils/themeUpdateCalls.js";
import { announcePolite } from "../../utils/a11y.js";
import { ActionButton, Card } from "./primitives.jsx";

const runAsyncAction = async ({ action, onStart, onEnd, announce }) => {
  onStart?.();
  try {
    await action();
    if (announce) {
      announcePolite(announce);
    }
  } catch {
    announcePolite("Action failed. Check logs for details.");
  } finally {
    onEnd?.();
  }
};

const ThemeCardFrame = ({ title, image, imageAlt, metadata, actions }) => (
  <Card className="flex h-full flex-col gap-3 p-3">
    <div className="ui-surface aspect-[16/10] overflow-hidden p-2">
      {image ? (
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          width="640"
          height="400"
          className="h-full w-full object-contain"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-xs ui-muted">No preview available</div>
      )}
    </div>

    <div className="min-w-0 space-y-1 text-sm">
      <h3 className="truncate text-base font-semibold text-[var(--text-0)]">{title}</h3>
      {metadata}
    </div>

    <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-3">{actions}</div>
  </Card>
);

export const OmarchyCollectionCard = ({ card, addToBucket }) => {
  const navigate = useNavigate();
  const { setIsWorking } = useTheme();

  if (!card?.github_repo) {
    return null;
  }

  const applyTheme = () =>
    runAsyncAction({
      action: async () => {
        await applyOmarchyTheme(card.id);
      },
      onStart: () => setIsWorking(true),
      onEnd: () => setIsWorking(false),
      announce: "Omarchy theme applied.",
    });

  return (
    <ThemeCardFrame
      title={card.title}
      image={card.theme_image}
      imageAlt={`${card.title} preview`}
      metadata={
        <a
          href={card.github_repo}
          target="_blank"
          rel="noopener noreferrer"
          className="ui-link break-all"
          aria-label={`Open ${card.title} repository`}
        >
          Theme Repository
        </a>
      }
      actions={
        <>
          <ActionButton onClick={applyTheme} aria-label={`Apply ${card.title}`}>
            Apply
          </ActionButton>
          <ActionButton
            onClick={() => navigate(`/collection/omarchy-themes/${card.id}`)}
            aria-label={`Open details for ${card.title}`}
          >
            Details
          </ActionButton>
          <ActionButton onClick={() => addToBucket(card.id)} aria-label={`Add ${card.title} to bucket`}>
            Add to Bucket
          </ActionButton>
        </>
      }
    />
  );
};

export const WaybarCollectionCard = ({ data, addToBucket }) => {
  const { setIsWorking } = useTheme();
  const navigate = useNavigate();

  const applyTheme = () =>
    runAsyncAction({
      action: async () => {
        await changeWaybarTheme(data.id);
      },
      onStart: () => setIsWorking(true),
      onEnd: () => setIsWorking(false),
      announce: "Waybar theme applied.",
    });

  return (
    <ThemeCardFrame
      title={data.theme_name}
      image={data.image_link}
      imageAlt={`${data.theme_name} preview`}
      metadata={<p className="ui-muted">Theme ID: {data.id}</p>}
      actions={
        <>
          <ActionButton onClick={applyTheme} aria-label={`Apply ${data.theme_name}`}>
            Apply
          </ActionButton>
          <ActionButton
            onClick={() => navigate(`/collection/waybar/${data.id}`)}
            aria-label={`Open details for ${data.theme_name}`}
          >
            Details
          </ActionButton>
          <ActionButton onClick={() => addToBucket(data.id)} aria-label={`Add ${data.theme_name} to bucket`}>
            Add to Bucket
          </ActionButton>
        </>
      }
    />
  );
};

export const WalkerCollectionCard = ({ data, addToBucket }) => {
  const { setIsWorking } = useTheme();
  const navigate = useNavigate();

  const applyTheme = () =>
    runAsyncAction({
      action: async () => {
        await changeWalkerTheme(data.id);
      },
      onStart: () => setIsWorking(true),
      onEnd: () => setIsWorking(false),
      announce: "Walker theme applied.",
    });

  return (
    <ThemeCardFrame
      title={data.name}
      image={data.images?.[0]}
      imageAlt={`${data.name} preview`}
      metadata={<p className="ui-muted">Includes {data.images?.length || 0} previews</p>}
      actions={
        <>
          <ActionButton onClick={applyTheme} aria-label={`Apply ${data.name}`}>
            Apply
          </ActionButton>
          <ActionButton
            onClick={() => navigate(`/collection/walker/${data.id}`)}
            aria-label={`Open details for ${data.name}`}
          >
            Details
          </ActionButton>
          <ActionButton onClick={() => addToBucket(data.id)} aria-label={`Add ${data.name} to bucket`}>
            Add to Bucket
          </ActionButton>
        </>
      }
    />
  );
};

export const HyprlockCollectionCard = ({ data, addToBucket }) => {
  const { setIsWorking } = useTheme();
  const navigate = useNavigate();

  const applyTheme = () =>
    runAsyncAction({
      action: async () => {
        await changeHyprlockTheme(data.id);
      },
      onStart: () => setIsWorking(true),
      onEnd: () => setIsWorking(false),
      announce: "Hyprlock theme applied.",
    });

  return (
    <ThemeCardFrame
      title={data.name}
      image={data.preview_image}
      imageAlt={`${data.name} preview`}
      metadata={<p className="ui-muted">Theme ID: {data.id}</p>}
      actions={
        <>
          <ActionButton onClick={applyTheme} aria-label={`Apply ${data.name}`}>
            Apply
          </ActionButton>
          <ActionButton
            onClick={() => navigate(`/collection/hyprlock/${data.id}`)}
            aria-label={`Open details for ${data.name}`}
          >
            Details
          </ActionButton>
          <ActionButton onClick={() => addToBucket(data.id)} aria-label={`Add ${data.name} to bucket`}>
            Add to Bucket
          </ActionButton>
        </>
      }
    />
  );
};

export const FastfetchCollectionCard = ({ data, type, addToBucket }) => {
  const { setIsWorking } = useTheme();

  const applyTheme = () =>
    runAsyncAction({
      action: async () => {
        await changeFastfetchTheme(data.name, type);
      },
      onStart: () => setIsWorking(true),
      onEnd: () => setIsWorking(false),
      announce: "Fastfetch style applied.",
    });

  return (
    <ThemeCardFrame
      title={data.name}
      image={data.image_link}
      imageAlt={`${data.name} preview`}
      metadata={<p className="ui-muted">Type: {type}</p>}
      actions={
        <>
          <ActionButton onClick={applyTheme} aria-label={`Apply ${data.name}`} className="sm:col-span-2">
            Apply
          </ActionButton>
          <ActionButton
            onClick={() => addToBucket(data.name, type)}
            aria-label={`Add ${data.name} to bucket`}
          >
            Add to Bucket
          </ActionButton>
        </>
      }
    />
  );
};
