"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "@/lib/i18n/types";

// Create a context for Dictionary
const DictionaryContext = createContext<Dictionary | null>(null);

// Provider
export function DictionaryProvider({
  dict,
  children,
}: {
  dict: Dictionary;
  children: React.ReactNode;
}) {
  return <DictionaryContext.Provider value={dict}>{children}</DictionaryContext.Provider>;
}

// Hook to use the dictionary
export function useDictionary() {
  const ctx = useContext(DictionaryContext);
  if (!ctx) throw new Error("useDictionary must be used within a DictionaryProvider");
  return ctx;
}
