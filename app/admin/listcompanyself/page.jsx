"use client";
import dynamic from "next/dynamic";
import ListCompany from "@/components/admin/admin-dashboard/listcompanyself";

const index = () => {
  return (
    <>
      <ListCompany />
    </>
  );
};
export default dynamic(() => Promise.resolve(index), { ssr: false });
