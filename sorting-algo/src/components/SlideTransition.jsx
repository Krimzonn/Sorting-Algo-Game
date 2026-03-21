import { useState, useEffect } from "react";

function SlideTransition({ children, triggerKey }) {
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    setPhase("closing");

    const timer1 = setTimeout(() => setPhase("paused"), 500);
    const timer2 = setTimeout(() => setPhase("opening"), 1600);
    const timer3 = setTimeout(() => setPhase("idle"), 2100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [triggerKey]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {children}

      {phase !== "idle" && (
        <>
          <div
            className={`fixed top-0 left-0 w-1/2 h-full bg-white z-50 
            ${phase === "opening" ? "slide-out-left" : "slide-in-left"}`}
            style={{ width: "43%" }}
          ></div>

          {phase === "paused" && (
            <div className="fixed top-0 left-[43%] w-[14%] h-full bg-white z-50 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <p className="text-xl font-bold text-fuchsia-500 animate-pulse text-center">
                  Sorting Algo
                </p>
                <div className="w-14 h-14 rounded-full border-[5px] border-fuchsia-500 border-t-transparent animate-spin"></div>
              </div>
            </div>
          )}

          <div
            className={`fixed top-0 right-0 w-1/2 h-full bg-white z-50
            ${phase === "opening" ? "slide-out-right" : "slide-in-right"}`}
            style={{ width: "43%" }}
          ></div>
        </>
      )}
    </div>
  );
}

export default SlideTransition;
