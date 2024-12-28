import React from "react";

const FloatingCircles = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full mix-blend-multiply filter blur-xl animate-float-${i + 1}`}
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(139,92,246,0) 70%)",
            width: `${Math.random() * 200 + 100}px`,
            height: `${Math.random() * 200 + 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float-${i + 1} ${Math.random() * 10 + 10}s infinite linear`
          }}
        />
      ))}
    </div>
  );
};

export default FloatingCircles;