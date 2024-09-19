"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import gsap from "gsap";
import { useLayoutEffect } from "react";
import { useAccount } from "wagmi";

import Overview from "./overview/overview.tsx";
import Disconnected from "./disconnected.tsx";

export default function Migration() {
  const { address } = useAccount();

  useLayoutEffect(() => {
    gsap.registerPlugin();
    AOS.init();
  }, []);

  return <main>{address ? <Overview /> : <Disconnected />}</main>;
}
