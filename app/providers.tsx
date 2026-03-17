"use client";

import { createContext, useContext } from "react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import type { CompanyConfig } from "./config/company";

const CompanyContext = createContext<CompanyConfig | null>(null);

export function Providers({ children, company }: { children: React.ReactNode; company: CompanyConfig }) {
  return (
    <CompanyContext.Provider value={company}>
      <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const company = useContext(CompanyContext);

  if (!company) {
    throw new Error("useCompany must be used within Providers");
  }

  return company;
}
