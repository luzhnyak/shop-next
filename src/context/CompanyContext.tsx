"use client";

import { ICompany, IUser } from "@/types";
import { createContext, useContext } from "react";

type CompanyContextType = {
  company: ICompany;
  companyId: number;
  currentUser: IUser;
  isOwner: boolean;
};

export const CompanyContext = createContext<CompanyContextType | null>(null);

export const useCompanyContext = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompanyContext must be used within a CompanyProvider");
  }
  return context;
};
