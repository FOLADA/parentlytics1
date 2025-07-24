"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabaseClient";

export function useProtectedRoute() {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (isMounted && !user) {
        router.replace("/login");
      }
    }
    checkAuth();
    return () => { isMounted = false; };
  }, [router]);
} 