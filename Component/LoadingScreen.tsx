import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Loader } from 'lucide-react';

gsap.registerPlugin(useGSAP);

const LoadingScreen = () => {
  const loaderRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {

    // Fonction de chargement
    const handleLoad = () => {
      gsap.to(loaderRef.current, {
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
          <Loader ref={iconRef} className="text-zinc-950 font-medium opacity-0" />
      </div>
  );
};

export default LoadingScreen;