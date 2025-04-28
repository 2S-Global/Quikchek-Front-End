import Wrapper from "@/layout/Wrapper";
/* import Home from "@/components/home-1"; */
import LogIn from "@/components/pages-menu/login";

export const metadata = {
  title: "Quikchek",
  description: "Quikchek Verification",
};

export default function page() {
  return (
    <Wrapper>
      {/*   <Home /> */}
      <LogIn />
    </Wrapper>
  );
}
