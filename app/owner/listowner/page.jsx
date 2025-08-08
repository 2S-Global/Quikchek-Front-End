"use client";
import dynamic from "next/dynamic";
import ListCompany from "@/components/admin/admin-dashboard/listcompany";
// import Listowner from "@/components/admin/admin-dashboard/listowner";
import ListOwner from "@/components/owner/owner-dashboard/listowner";

const Index = () => {
  return (
    <>
      {/* <ListCompany /> */}
      <ListOwner />
    </>
  );
};
// export default dynamic(() => Promise.resolve(index), { ssr: false });
export default Index;
