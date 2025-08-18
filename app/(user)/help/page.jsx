"use client";
import dynamic from "next/dynamic";
/* import DashboadHome from "@/components/dashboard-pages/employers-dashboard/dashboard";
 */

import Help from "@/components/dashboard-pages/employers-dashboard/help";
const index = () => {
  return (
    <>
      <Help />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
