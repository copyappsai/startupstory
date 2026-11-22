import React from 'react';
import Image from 'next/image';

export default function HeroIllustration() {
  return (
    <div className="relative w-full max-w-[560px] mx-auto lg:max-w-none flex items-center justify-center select-none">
      <div className="relative w-full">
        <Image
          src="/assets/images/hero-community-clean.png"
          alt="Startup founder sharing their journey on StartupStory"
          width={1120}
          height={840}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
          className="w-full h-auto object-contain drop-shadow-sm transition-transform duration-300 hover:scale-[1.01]"
        />
      </div>
    </div>
  );
}
