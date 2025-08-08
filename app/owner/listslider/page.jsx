"use client";
import dynamic from "next/dynamic";
import Listslider from "@/components/admin/admin-dashboard/listslider";

const index = () => {
  return (
    <>
      <Listslider />
    </>
  );
};
export default dynamic(() => Promise.resolve(index), { ssr: false });
