"use client";

import { createContext } from "react";

export const ServicesTierContext = createContext<{
  selectedTier: string | null;
  setSelectedTier: (tier: string) => void;
  formRef: React.RefObject<HTMLDivElement | null>;
}>({
  selectedTier: null,
  setSelectedTier: () => {},
  formRef: { current: null },
});
