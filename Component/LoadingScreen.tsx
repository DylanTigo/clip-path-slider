import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Loader } from 'lucide-react';

gsap.registerPlugin(useGSAP);

const LoadingScreen = () => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {

    gsap.to(iconRef.current, {
      rotate: 360,
      duration: 1,
      repeat: -1,
    })

    // Fonction de chargement
    const handleLoad = () => {
      const tl = gsap.timeline();

      tl.to(loaderRef.current, {
        autoAlpha: 0,
        duration: 0.1,
        ease: "power2.inOut"
      })

    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
      <div 
        ref={loaderRef}
        className="center-layout flex items-center justify-center"
        style={{
          backgroundColor: "rgba(255, 255, 255)",
          width: "100vw",
          height: "100vh",
          zIndex: 100,
        }}
      >
        <div className="flex flex-col items-center">
          <Loader ref={iconRef} className="text-zinc-950 font-medium opacity-0" />
          <p 
            ref={textRef}
            className="mt-4 text-zinc-950 font-medium opacity-0"
          >
            Chargement...
          </p>
        </div>
      </div>
  );
};

export default LoadingScreen;