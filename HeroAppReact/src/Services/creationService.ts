const key = (userId: string) => `epic-enclave-creations:${userId}`;

export const rememberCreation = (userId: string, heroId: string) => {
  const ids = getCreationIds(userId);
  localStorage.setItem(key(userId), JSON.stringify([...new Set([heroId, ...ids])]));
};

export const getCreationIds = (userId: string): string[] => {
  try {
    const value = JSON.parse(localStorage.getItem(key(userId)) || "[]");
    return Array.isArray(value) ? value.filter((id): id is string => typeof id === "string") : [];
  } catch { return []; }
};
