"use client";

import { Toaster } from "sonner";
import ReactQueryProvider from "./ReactQueryProvider";

interface IProvider {
  children: React.ReactNode;
}

export const Provider = ({ children }: IProvider) => {
  return (
    <ReactQueryProvider>
      {children}
      <Toaster />
    </ReactQueryProvider>
  );
};
