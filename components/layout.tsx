import Header from "./header";

import "../src/globals.css";

import Footer from "./footer";
import { Outlet } from "react-router-dom";
export default function RootLayout() {
  return (
    // <html lang="en">
    <div className="font-pp">
      <Header />
      <div
        className="px-[25px] pb-[40px] lg:px-[40px] xl:px-[60px] 2xl:px-[80px] pt-[106px] lg:pt-[109px] xl:pt-[129px] 2xl:pt-[160px] min-h-[calc(100vh-656px)] lg:min-h-[calc(100vh-402px)]
      xl:min-h-[calc(100vh-402px)] 2xl:min-h-[calc(100vh-417px)]"
      >
        <Outlet />
      </div>
      <Footer />
    </div>
    // </html>
  );
}
