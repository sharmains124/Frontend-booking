import React from 'react';
import SearchForm from './SearchForm';

const Hero = ({ 
  bgType = 'video', 
  bgUrl = '/assets/Destination video.mp4',
  animate = false,
  isFlight = false,
  title,
  subTitle,
  hideSearchTabs = false,
  initialTab
}) => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[600px] flex items-center justify-center pt-32 pb-20">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        {/* Overlays for better contrast and premium feel */}
        <div className="absolute inset-0 bg-black/30 z-10 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20 z-10"></div>
        
        {animate && (
          <style>
            {`
              @keyframes panBackground {
                0% { transform: scale(1) translateX(0); }
                50% { transform: scale(1.1) translateX(-2%); }
                100% { transform: scale(1) translateX(0); }
              }
              .animate-pan {
                animation: panBackground 25s ease-in-out infinite;
              }
            `}
          </style>
        )}

        {bgType === 'video' ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className={`w-full h-full object-cover opacity-80 ${animate ? 'animate-pan' : ''}`}
          >
            <source src={bgUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={bgUrl}
            alt="Hero Background"
            className={`w-full h-full object-cover opacity-80 ${animate ? 'animate-pan' : ''}`}
          />
        )}
      </div>

      <div className="container-custom relative z-20 text-center px-6 mt-0">
        <div className="mb-1 md:mb-2 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-[75px] font-black text-white leading-tight tracking-tight mb-4 drop-shadow-2xl animate-fade-in-up delay-100">
            {title ? (
              title
            ) : isFlight ? (
              <>
                Your <br className="md:hidden" />
                <span className="decoration-primary/80 decoration-4 underline underline-offset-[12px]">Journey</span> Starts Here
              </>
            ) : (
              <>
                One Platform. <br className="md:hidden" />
                <span className="decoration-primary/80 decoration-4 underline underline-offset-[12px]">Every Journey.</span>
              </>
            )}
          </h1>
          
          <p className="text-sm md:text-base lg:text-lg text-white/90 max-w-2xl mx-auto font-medium tracking-wide mb-8 drop-shadow-lg leading-relaxed animate-fade-in-up delay-200">
            {subTitle ? (
              subTitle
            ) : isFlight ? (
              <>
                Precision-crafted travel experiences, engineered with discretion, <br className="hidden md:block" />
                sophistication, and absolute excellence.
              </>
            ) : (
              "Book flights, hotels, buses, and trains with ease and confidence."
            )}
          </p>
        </div>

        {/* Search Engine Integration */}
        <div className="max-w-[1200px] mx-auto relative z-30 pb-12 pt-4">
          <SearchForm hideTabs={hideSearchTabs} initialTab={initialTab} />
        </div>
      </div>

      {/* Aesthetic Micro-elements */}
      <div className="absolute bottom-10 left-10 text-white/20 text-[10px] font-bold tracking-[0.5em] uppercase pointer-events-none v-rl">
        WINGTRIP &bull; ELITE EXPLORATION
      </div>
    </section>
  );
};

export default Hero;
