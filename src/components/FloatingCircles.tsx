import React from "react";

const FloatingCircles = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full mix-blend-multiply filter blur-xl animate-float-${i + 1}`}
          style={{
            background: [
              "radial-gradient(circle, rgba(242,252,226,1) 0%, rgba(242,252,226,0) 70%)",
              "radial-gradient(circle, rgba(254,247,205,1) 0%, rgba(254,247,205,0) 70%)",
              "radial-gradient(circle, rgba(229,222,255,1) 0%, rgba(229,222,255,0) 70%)",
              "radial-gradient(circle, rgba(255,222,226,1) 0%, rgba(255,222,226,0) 70%)",
              "radial-gradient(circle, rgba(211,228,253,1) 0%, rgba(211,228,253,0) 70%)",
            ][i],
            width: `${Math.random() * 600 + 400}px`,
            height: `${Math.random() * 600 + 400}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingCircles;