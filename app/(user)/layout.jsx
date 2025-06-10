export const metadata = {
  title: "Quikchek Dashboard",
  description: "Quikchek Dashboard",
};

import AuthWrapper from "./AuthWrapper";

export default function Layout({ children }) {
  return <AuthWrapper>{children}</AuthWrapper>;
}
