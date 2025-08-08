"use client";
import dynamic from "next/dynamic";
// import DashboadHome from "@/components/admin/admin-dashboard/dashboard";
import DashboardOwner from "@/components/owner/owner-dashboard/dashboard";

const index = () => {
  return (
    <>
      {/* <DashboadHome /> */}
      <DashboardOwner/>
      {/* <h1>Welcome to owners dashboard !</h1> */}
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
