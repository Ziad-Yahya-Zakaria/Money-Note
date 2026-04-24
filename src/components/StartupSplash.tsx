import { useEffect, useMemo, useState } from "react";

const MIN_SPLASH_MS = 1800;
const MAX_WAIT_FOR_IMAGE_MS = 2500;

export function StartupSplash({ children }: { children: React.ReactNode }) {
  const [minDelayDone, setMinDelayDone] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const splashSrc = useMemo(
    () => `${import.meta.env.BASE_URL}splash-screen.png`,
    [],
  );

  useEffect(() => {
    const minDelayTimer = window.setTimeout(() => {
      setMinDelayDone(true);
    }, MIN_SPLASH_MS);

    const fallbackTimer = window.setTimeout(() => {
      setImageFailed((current) => current || !imageReady);
      setImageReady(true);
    }, MAX_WAIT_FOR_IMAGE_MS);

    return () => {
      window.clearTimeout(minDelayTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, [imageReady]);

  const showSplash = !minDelayDone || !imageReady;

  return (
    <>
      {showSplash && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#737a78]"
          aria-label="شاشة بدء التطبيق"
          role="img"
        >
          {!imageFailed ? (
            <>
              <img
                src={splashSrc}
                alt="موني نوت"
                className="h-full w-full object-contain"
                onLoad={() => setImageReady(true)}
                onError={() => {
                  setImageFailed(true);
                  setImageReady(true);
                }}
              />
              <span className="sr-only">موني نوت</span>
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center text-white">
              <h1 className="text-6xl font-black tracking-tight">موني نوت</h1>
              <p className="mt-32 text-3xl font-bold leading-relaxed">
                تطوير
                <br />
                المبرمج زياد يحيى
              </p>
            </div>
          )}
        </div>
      )}

      <div className={showSplash ? "opacity-0" : "opacity-100 transition-opacity duration-300"}>
        {children}
      </div>
    </>
  );
}
