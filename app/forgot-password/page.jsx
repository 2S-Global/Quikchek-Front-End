"use client";
import dynamic from "next/dynamic";

import Forgotpass from "@/components/pages-menu/forgetpass";

const index = () => {
  return (
    <>
      <Forgotpass />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
