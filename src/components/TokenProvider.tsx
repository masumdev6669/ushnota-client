"use client";
import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";

export default function TokenProvider() {
  const { data: session } = useSession();

  useEffect(() => {
    const fetchToken = async () => {
      if (session?.user && !localStorage.getItem("token")) {
        try {
          const baseUrl =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

          const res = await fetch(`${baseUrl}/api/auth/token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: session.user.email,
              name: session.user.name,
            }),
          });

          const data = await res.json();
          if (data.token) {
            localStorage.setItem("token", data.token);
          }
        } catch (error) {
          console.error("Failed to get token", error);
        }
      }
    };
    fetchToken();
  }, [session]);

  return null;
}
