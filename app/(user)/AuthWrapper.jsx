// app/(user)/AuthWrapper.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Admin_token");
    if (!token) {
      router.push("/");
    } else {
      setIsClient(true); // only render after client check
    }
  }, []);

  if (!isClient) return null;

  return <>{children}</>;
}
