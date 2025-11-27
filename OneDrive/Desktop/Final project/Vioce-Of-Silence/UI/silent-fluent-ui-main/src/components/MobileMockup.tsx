import { ReactNode } from "react";

interface MobileMockupProps {
  children: ReactNode;
}

const MobileMockup = ({ children }: MobileMockupProps) => {
  return (
    <div className="w-full max-w-[440px] sm:max-w-[480px] md:max-w-[520px] lg:max-w-[560px] px-4 sm:px-0">
      <div className="relative mx-auto aspect-[9/19.5] min-h-[640px] max-h-[900px] w-full rounded-[3rem] bg-gradient-to-br from-[#14182B] via-[#05060C] to-[#05060C] p-3 shadow-[0_40px_120px_rgba(5,6,12,0.8)] transition-all duration-300">
        {/* Metallic outer rim */}
        <div className="absolute inset-0 rounded-[3rem] border border-white/10 bg-gradient-to-b from-white/10 via-transparent to-white/5 pointer-events-none" />

        {/* Side buttons */}
        <span className="absolute left-1 top-32 h-14 w-1.5 rounded-full bg-white/15" />
        <span className="absolute left-1 top-52 h-8 w-1.5 rounded-full bg-white/15" />
        <span className="absolute right-1 top-40 h-16 w-1.5 rounded-full bg-white/15" />

        {/* Inner shell */}
        <div className="relative h-full rounded-[2.2rem] bg-black/80 p-3">
          {/* Dynamic island */}
          <div className="pointer-events-none absolute top-4 left-1/2 h-6 w-32 -translate-x-1/2 rounded-full bg-black/80 backdrop-blur-lg shadow-[0_4px_15px_rgba(0,0,0,0.4)]" />

          <div className="relative h-full w-full rounded-[2rem] border border-white/5 bg-gradient-to-b from-background/90 to-background/70 p-1">
            <div className="mobile-shell h-full w-full rounded-[1.6rem] bg-background/95">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMockup;

