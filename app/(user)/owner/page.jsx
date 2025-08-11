"use client";
import dynamic from "next/dynamic";
// import DashboadHome from "@/components/dashboard-pages/employers-dashboard/aadhar-otp";
import OwnerHome from "@/components/dashboard-pages/employers-dashboard/listowner";

const index = () => {
  return (
    <>
      <OwnerHome />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });