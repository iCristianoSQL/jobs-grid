"use client";
import { JobGrid } from "@/components/JobGrid";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../services/queryClient";
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastAlert } from "@/components/ToastAlert";
import "./page.css";

export default function Home() {
  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <ToastAlert />
        <ReactQueryDevtools />
        <JobGrid />
      </QueryClientProvider>
    </main>
  );
}
