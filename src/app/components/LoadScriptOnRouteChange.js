'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function LoadScriptOnRouteChange() {
  const pathname = usePathname();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/assets/js/main.js'; // example path
    script.async = true;

    const script2 = document.createElement('script');
    script2.src = '/assets/js/jquery-3.7.0.min.js'; 
    script2.async = true;

    const script3 = document.createElement('script');
    script2.src = '/assets/js/popper.min.js'; 
    script2.async = true;

    const script4 = document.createElement('script');
    script2.src = '/assets/js/bootstrap.min.js'; 
    script2.async = true;

    const script5 = document.createElement('script');
    script2.src = '/assets/js/bsnav.min.js'; 
    script2.async = true;

    const script6 = document.createElement('script');
    script2.src = '/assets/js/jquery.magnific-popup.min.js'; 
    script2.async = true;

    const script7 = document.createElement('script');
    script2.src = '/assets/js/isotope.pkgd.min.js'; 
    script2.async = true;

    const script8 = document.createElement('script');
    script2.src = '/assets/js/imagesloaded.pkgd.min.js'; 
    script2.async = true;

    const script9 = document.createElement('script');
    script2.src = '/assets/js/wow.min.js'; 
    script2.async = true;

    const script10 = document.createElement('script');
    script2.src = '/assets/js/count-to.js'; 
    script2.async = true;

    const script11 = document.createElement('script');
    script2.src = '/assets/js/progress-bar.min.js'; 
    script2.async = true;

    const script12 = document.createElement('script');
    script2.src = '/assets/js/jquery.easypiechart.js'; 
    script2.async = true;

    const script13 = document.createElement('script');
    script2.src = '/assets/js/typed.js'; 
    script2.async = true;

    const script14 = document.createElement('script');
    script2.src = '/assets/js/YTPlayer.min.js'; 
    script2.async = true;

    const script15 = document.createElement('script');
    script2.src = '/assets/js/jquery.appear.js'; 
    script2.async = true;

    const script16 = document.createElement('script');
    script2.src = '/assets/js/jquery.easing.min.js'; 
    script2.async = true;

    const script17 = document.createElement('script');
    script2.src = '/assets/js/swiper-bundle.min.js'; 
    script2.async = true;

    const script18 = document.createElement('script');
    script2.src = '/assets/js/active-class.js'; 
    script2.async = true;

    const script19 = document.createElement('script');
    script2.src = '/assets/js/jquery-ui.min.js'; 
    script2.async = true;

    document.body.appendChild(script);
    document.body.appendChild(script2);
    document.body.appendChild(script3);
    document.body.appendChild(script4);
    document.body.appendChild(script5);
    document.body.appendChild(script6);
    document.body.appendChild(script7);
    document.body.appendChild(script8);
    document.body.appendChild(script9);
    document.body.appendChild(script10);
    document.body.appendChild(script11);
    document.body.appendChild(script12);
    document.body.appendChild(script13);
    document.body.appendChild(script14);
    document.body.appendChild(script15);
    document.body.appendChild(script16);
    document.body.appendChild(script17);
    document.body.appendChild(script18);
    document.body.appendChild(script19);


    return () => {
      document.body.removeChild(script);
      document.body.removeChild(script2);
      document.body.removeChild(script3);
      document.body.removeChild(script4);
      document.body.removeChild(script5);
      document.body.removeChild(script6);
      document.body.removeChild(script7);
      document.body.removeChild(script8);
      document.body.removeChild(script9);
      document.body.removeChild(script10);
      document.body.removeChild(script11);
      document.body.removeChild(script12);
      document.body.removeChild(script13);
      document.body.removeChild(script14);
      document.body.removeChild(script15);
      document.body.removeChild(script16);
      document.body.removeChild(script17);
      document.body.removeChild(script18);
      document.body.removeChild(script19);
    };
  }, [pathname]);

  return null;
}

export default LoadScriptOnRouteChange;
