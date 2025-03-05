"use client";

import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { useEffect, useState } from "react";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({});

const persister = createSyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : null,
  key: "bogutovoCache",
});

export const QueryProvider = ({ children }) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
      <ToastContainer transition={Flip} theme={"colored"} />
    </PersistQueryClientProvider>
  );
};
