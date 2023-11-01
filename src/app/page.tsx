"use client";
import { JobGrid } from "@/components/JobGrid";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../services/queryClient";
import "./page.css";
import { ToastAlert } from "@/components/ToastAlert";

export default function Home() {
  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <ToastAlert />
        <JobGrid />
      </QueryClientProvider>
    </main>
  );
}
