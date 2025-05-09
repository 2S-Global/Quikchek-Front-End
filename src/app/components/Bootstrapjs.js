"use client";
import React, { useEffect } from 'react'
import Script from "next/script";
import { usePathname } from "next/navigation";
import { loadScript } from "@/lib/loadScript";

function Bootstrapjs() {

    const pathname = usePathname(); // Detect route change
    
        useEffect(() => {
            async function loadBsnav() {
              try {
                // Load jQuery first
                await loadScript("/assets/js/jquery-3.7.0.min.js");
        
                // Then load bsnav
                await loadScript("/assets/js/bsnav.min.js");
        
                // Check if plugin is registered
                if (typeof window.$ !== "undefined" && typeof window.$.fn.bsnav === "function") {
                  $(".bsnav").bsnav(); // Init
                } else {
                  console.error("bsnav is not available");
                }
              } catch (err) {
                console.error("Script load error:", err);
              }
            }
        
            loadBsnav();
          }, []);


  return (
    <>
      <Script src="/assets/js/jquery-3.7.0.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/popper.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/bootstrap.min.js" strategy="beforeInteractive" />

      <Script src="/assets/js/bsnav.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/jquery.magnific-popup.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/isotope.pkgd.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/wow.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/count-to.js" strategy="afterInteractive" />
      <Script src="/assets/js/progress-bar.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/jquery.easypiechart.js" strategy="afterInteractive" />
      <Script src="/assets/js/typed.js" strategy="afterInteractive" />
      <Script src="/assets/js/YTPlayer.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/jquery.appear.js" strategy="afterInteractive" />
      <Script src="/assets/js/jquery.easing.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/swiper-bundle.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/active-class.js" strategy="afterInteractive" />
      <Script src="/assets/js/jquery-ui.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/main.js" strategy="afterInteractive" />
    </>
  )
}

export default Bootstrapjs