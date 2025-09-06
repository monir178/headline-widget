import { PreviewText } from "./PreviewText";

interface DeviceMockupProps {
  className?: string;
}

export const MobileMockup = ({ className = "" }: DeviceMockupProps) => (
  <div
    className={`flex items-center justify-center p-1 sm:p-2 md:p-4 lg:p-6 h-full ${className}`}>
    <div className="relative">
      <div className="relative w-[200px] h-[400px] sm:w-[220px] sm:h-[440px] md:w-[240px] md:h-[480px] lg:w-[260px] lg:h-[520px] xl:w-[280px] xl:h-[560px] bg-gray-800 rounded-[40px] sm:rounded-[44px] md:rounded-[48px] lg:rounded-[52px] xl:rounded-[56px] p-2 sm:p-2.5 md:p-3 lg:p-3 xl:p-3.5 shadow-2xl">
        <div className="w-full h-full bg-black rounded-[36px] sm:rounded-[40px] md:rounded-[44px] lg:rounded-[48px] xl:rounded-[52px] overflow-hidden relative">
          <div className="absolute top-2.5 sm:top-3 md:top-3.5 lg:top-3.5 xl:top-4 left-1/2 transform -translate-x-1/2 w-16 sm:w-18 md:w-20 lg:w-22 xl:w-24 h-3 sm:h-3.5 md:h-4 lg:h-4 xl:h-5 bg-black rounded-full z-10"></div>
          <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 overflow-y-auto scrollbar-hide">
            <div className="p-2.5 sm:p-3 md:p-3.5 lg:p-3.5 xl:p-4 min-h-full flex items-center justify-center">
              <div className="w-full max-w-[150px] sm:max-w-[170px] md:max-w-[190px] lg:max-w-[200px] xl:max-w-[220px]">
                <PreviewText />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-1.5 sm:bottom-2 md:bottom-2.5 lg:bottom-2.5 xl:bottom-3 left-1/2 transform -translate-x-1/2 w-16 sm:w-18 md:w-20 lg:w-22 xl:w-24 h-0.5 sm:h-1 md:h-1 lg:h-1 xl:h-1 bg-white/30 rounded-full"></div>
    </div>
  </div>
);

export const DesktopMockup = ({ className = "" }: DeviceMockupProps) => (
  <div
    className={`flex items-center justify-center p-1 sm:p-2 md:p-4 lg:p-6 h-full ${className}`}>
    <div className="relative">
      <div className="relative w-[400px] h-[250px] sm:w-[450px] sm:h-[280px] md:w-[500px] md:h-[310px] lg:w-[600px] lg:h-[375px] xl:w-[700px] xl:h-[440px] bg-gray-800 rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 shadow-2xl">
        <div className="w-full h-full bg-black rounded-md sm:rounded-lg md:rounded-xl overflow-hidden relative">
          <div className="absolute top-2 sm:top-3 md:top-4 left-1/2 transform -translate-x-1/2 w-8 sm:w-10 md:w-12 lg:w-14 xl:w-16 h-1 sm:h-1.5 md:h-2 lg:h-2.5 xl:h-3 bg-gray-600 rounded-full"></div>
          <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 overflow-y-auto scrollbar-hide">
            <div className="p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 min-h-full flex items-center justify-center">
              <div className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px]">
                <PreviewText />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 h-1 sm:h-1.5 md:h-2 lg:h-2.5 xl:h-3 bg-gray-600 rounded-full"></div>
    </div>
  </div>
);

export const TabletMockup = ({ className = "" }: DeviceMockupProps) => (
  <div
    className={`flex items-center justify-center p-1 sm:p-2 md:p-4 lg:p-6 h-full ${className}`}>
    <div className="relative">
      <div className="relative w-[300px] h-[400px] sm:w-[340px] sm:h-[450px] md:w-[380px] md:h-[500px] lg:w-[420px] lg:h-[560px] xl:w-[460px] xl:h-[620px] bg-gray-800 rounded-xl sm:rounded-2xl md:rounded-3xl p-2 sm:p-2.5 md:p-3 lg:p-3.5 xl:p-4 shadow-2xl">
        <div className="w-full h-full bg-black rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden relative">
          <div className="absolute top-2 sm:top-3 md:top-4 left-1/2 transform -translate-x-1/2 w-6 sm:w-8 md:w-10 lg:w-12 xl:w-14 h-1 sm:h-1.5 md:h-2 lg:h-2.5 xl:h-3 bg-gray-600 rounded-full"></div>
          <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 overflow-y-auto scrollbar-hide">
            <div className="p-2.5 sm:p-3 md:p-4 lg:p-5 xl:p-6 min-h-full flex items-center justify-center">
              <div className="w-full max-w-[220px] sm:max-w-[250px] md:max-w-[280px] lg:max-w-[320px] xl:max-w-[360px]">
                <PreviewText />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-1.5 sm:-bottom-2 md:-bottom-2.5 left-1/2 transform -translate-x-1/2 w-12 sm:w-14 md:w-16 lg:w-18 xl:w-20 h-0.5 sm:h-1 md:h-1 lg:h-1.5 xl:h-2 bg-gray-600 rounded-full"></div>
    </div>
  </div>
);
