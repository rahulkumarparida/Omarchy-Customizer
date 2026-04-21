const normalize = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const createEntry = ({ id, title, type, parentTitle, terms = [] }) => {
  const normalizedTerms = terms.map((term) => normalize(term)).filter(Boolean);
  const searchBlob = normalize([title, parentTitle, ...terms].join(" "));

  return {
    id,
    title,
    type,
    parentTitle,
    terms: normalizedTerms,
    searchBlob,
  };
};

export const buildDocsSearchIndex = ({
  overviewSection,
  gettingStartedSection,
  featureSections,
  editorsSection,
}) => {
  const entries = [];

  entries.push(
    createEntry({
      id: overviewSection.id,
      title: overviewSection.title,
      type: "Section",
      terms: [
        overviewSection.whatItIs,
        ...overviewSection.problemItSolves,
        ...overviewSection.whoItIsFor,
      ],
    }),
  );

  entries.push(
    createEntry({
      id: gettingStartedSection.id,
      title: gettingStartedSection.title,
      type: "Section",
      terms: [
        gettingStartedSection.summary,
        ...gettingStartedSection.prerequisites,
        ...gettingStartedSection.steps.map((step) => step.title),
      ],
    }),
  );

  gettingStartedSection.steps.forEach((step) => {
    entries.push(
      createEntry({
        id: step.id,
        title: step.title,
        type: "Step",
        parentTitle: gettingStartedSection.title,
        terms: step.details,
      }),
    );
  });

  entries.push(
    createEntry({
      id: "features",
      title: "Features",
      type: "Section",
      terms: featureSections.map((feature) => feature.title),
    }),
  );

  featureSections.forEach((feature) => {
    entries.push(
      createEntry({
        id: feature.id,
        title: feature.title,
        type: "Feature",
        parentTitle: "Features",
        terms: [feature.whatItDoes, feature.whyUseful, ...feature.steps.map((step) => step.title)],
      }),
    );

    feature.steps.forEach((step) => {
      entries.push(
        createEntry({
          id: step.id,
          title: step.title,
          type: "Step",
          parentTitle: feature.title,
          terms: step.details,
        }),
      );
    });
  });

  entries.push(
    createEntry({
      id: editorsSection.id,
      title: editorsSection.title,
      type: "Section",
      terms: [
        editorsSection.summary,
        ...editorsSection.capabilities,
        ...editorsSection.usageSteps.map((step) => step.title),
      ],
    }),
  );

  editorsSection.usageSteps.forEach((step) => {
    entries.push(
      createEntry({
        id: step.id,
        title: step.title,
        type: "Step",
        parentTitle: editorsSection.title,
        terms: step.details,
      }),
    );
  });

  return entries;
};

const scoreEntry = (entry, normalizedQuery, queryTokens) => {
  if (!normalizedQuery) return 0;

  let score = 0;

  if (entry.searchBlob.startsWith(normalizedQuery)) score += 9;
  if (entry.searchBlob.includes(normalizedQuery)) score += 6;
  if (normalize(entry.title).startsWith(normalizedQuery)) score += 5;
  if (normalize(entry.title).includes(normalizedQuery)) score += 3;

  queryTokens.forEach((token) => {
    if (entry.searchBlob.includes(token)) score += 2;
    if (entry.terms.some((term) => term.includes(token))) score += 1;
  });

  if (entry.type === "Section") score += 0.3;
  if (entry.type === "Feature") score += 0.2;

  return score;
};

export const searchDocs = (index, query, limit = 10) => {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) {
    return index
      .filter((entry) => entry.type !== "Step")
      .slice(0, limit);
  }

  const queryTokens = normalizedQuery.split(" ").filter(Boolean);

  return index
    .map((entry) => ({
      ...entry,
      score: scoreEntry(entry, normalizedQuery, queryTokens),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.title.localeCompare(b.title);
    })
    .slice(0, limit);
};
