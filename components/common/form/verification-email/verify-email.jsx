"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import FormContent2 from "./FormContent2"; // fix import path
import MessageComponent from "@/components/common/ResponseMsg";
export const dynamic = "force-dynamic"
const EmailVerificationPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        console.log("token missing");
        setError("Verification token is missing.");
        setLoading(false);
        return;
      }
  
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email/${token}`
        );

        setSuccess(res.data.message);
      } catch (err) {
  
        setError(err?.response?.data?.message || "Email verification failed.");
      } finally {
        setLoading(false);
      }
    };
  
    verifyEmail();
  }, [token]);
  

//   if (loading) return <p className="text-center mt-5">Verifying...</p>;

  return (
    <FormContent2 error={error} success={success} />
  );
};

export default EmailVerificationPage;
