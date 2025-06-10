"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const validToken = async () => {
    try {
      const token = localStorage.getItem("Admin_token");
      const response = await axios.get(`${apiurl}/api/auth/validtoken`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setIsClient(true);
      } else {
        localStorage.removeItem("Admin_token");
        router.push("/");
      }
    } catch (err) {
      localStorage.removeItem("Admin_token");
      router.push("/");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("Admin_token");
    if (!token) {
      router.push("/");
    } else {
      validToken();
    }
  }, [apiurl]);

  if (!isClient) return null;

  return <>{children}</>;
}
