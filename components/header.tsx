import "aos/dist/aos.css";
import Hamburger from "hamburger-react";
import { useAccount } from "wagmi";
import { cn } from "../lib/utils.ts";
import logo from "../src/images/logo.svg";
import { WalletAccount } from "./wallet-account.tsx";

import { useState } from "react";

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  const { address } = useAccount();

  return (
    <header className="absolute top-0 left-0 right-0 w-full  px-[25px] lg:px-[40px] xl:px-[60px] 2xl:px-[80px] py-[20px] xl:py-[28px] 2xl:py-[32px]">
      <div className={"flex justify-between items-center"}>
        <div className="flex items-center gap-[20px]">
          <img
            data-aos={"none"}
            data-aos-delay="100"
            data-aos-duration="1000"
            src={logo}
            alt="logo"
            className="w-[145.486px] h-[24px] xl:w-[169.736px] xl:h-[28px] 2xl:w-[212.17px] 2xl:h-[35px] "
          />
          {address && (
            <div className="hidden lg:block">
              <div className="flex items-center gap-[10px]">
                <div className="h-[32px] w-px bg-purple"></div>
                <p className="text-18">Migrate your UCO v1 tokens to v2</p>
              </div>
            </div>
          )}
        </div>
        {(
          <>
            <div className="hidden md:block">
              <WalletAccount onClose={() => setOpen(false)} />
            </div>
            {address && (
              <div
                className={cn(
                  "md:hidden transition-all duration-300 rounded-[3px] scale-75",
                  isOpen ? "bg-border-dark" : "",
                )}
              >
                <Hamburger
                  toggled={isOpen}
                  toggle={setOpen}
                  rounded
                  size={26}
                />
              </div>
            )}
          </>
        )}

        {isOpen && (
          <div className="absolute top-[66px] left-[25px] right-[25px]  bg-purple-med border border-border-light rounded-[10px] p-[18px]">
            <WalletAccount onClose={() => setOpen(false)} />
          </div>
        )}
      </div>
    </header>
  );
}
