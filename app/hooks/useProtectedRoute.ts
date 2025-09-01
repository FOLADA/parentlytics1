"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/ChildContext";

export function useProtectedRoute() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // Don't redirect while loading
    if (isLoading) return;
    
    // If no user after loading, redirect to signup
    if (!user) {
      router.replace("/signup");
    }
  }, [user, isLoading, router]);
} 