import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Page Not Found || Superio - Job Board React NextJS Template",
  description: "Superio - Job Board React NextJS Template",
};

export default function NotFound() {
  return (
    <div
      className="error-page-wrapper"
      style={{
        backgroundImage: `url(/images/404.jpg)`,
      }}
      data-aos="fade"
    >
      <div className="content">
        <div className="logo">
          <Link href="/">
            <Image width={154} height={50} src="/images/logo.svg" alt="brand" />
          </Link>
        </div>
        {/* End logo */}

        <h1>404!</h1>
        <p>The page you are looking for could not be found.</p>

        <Link className="theme-btn btn-style-three call-modal" href="/">
          BACK TO HOME
        </Link>
      </div>
      {/* End .content */}
    </div>
  );
}
