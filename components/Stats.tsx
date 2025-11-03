import React from "react";

export default function Stats() {
  const stats = [
    { value: "1K+", label: "Published Articles" },
    { value: "50+", label: "Expert Writers" },
    { value: "10M", label: "Monthly Readers" },
  ];

  return (
    <div className="grid grid-cols-3 gap-8 text-center max-w-xl">
      {stats.map((item) => (
        <div
          key={item.label}
          className="transition-transform hover:scale-105 duration-300"
        >
          <h3 className="text-4xl font-extrabold text-[var(--accent)] drop-shadow-md">
            {item.value}
          </h3>
          <p className="text-sm text-[var(--muted)] mt-2">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
