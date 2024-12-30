import React from "react";

const FloatingCircles = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full mix-blend-multiply opacity-70 filter blur-xl animate-float-${i + 1}`}
          style={{
            background: [
              "radial-gradient(circle, rgba(192,132,252,0.8) 0%, rgba(192,132,252,0) 70%)",
              "radial-gradient(circle, rgba(244,114,182,0.8) 0%, rgba(244,114,182,0) 70%)",
              "radial-gradient(circle, rgba(129,140,248,0.8) 0%, rgba(129,140,248,0) 70%)",
              "radial-gradient(circle, rgba(251,146,60,0.8) 0%, rgba(251,146,60,0) 70%)",
              "radial-gradient(circle, rgba(147,197,253,0.8) 0%, rgba(147,197,253,0) 70%)",
            ][i],
            width: `${Math.random() * 600 + 400}px`,
            height: `${Math.random() * 600 + 400}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingCircles;