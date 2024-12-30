import React from "react";

const FloatingCircles = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full mix-blend-multiply opacity-90 filter blur-xl animate-float-${i + 1}`}
          style={{
            background: [
              "radial-gradient(circle, rgba(242,252,226,0.9) 0%, rgba(242,252,226,0) 70%)",
              "radial-gradient(circle, rgba(254,247,205,0.9) 0%, rgba(254,247,205,0) 70%)",
              "radial-gradient(circle, rgba(229,222,255,0.9) 0%, rgba(229,222,255,0) 70%)",
              "radial-gradient(circle, rgba(255,222,226,0.9) 0%, rgba(255,222,226,0) 70%)",
              "radial-gradient(circle, rgba(211,228,253,0.9) 0%, rgba(211,228,253,0) 70%)",
            ][i],
            width: `${Math.random() * 800 + 600}px`,
            height: `${Math.random() * 800 + 600}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingCircles;