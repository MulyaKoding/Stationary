"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [nomoAntream, setNomoAntream] = useState<string>("01");
  const [text, setText] = useState<string>(`Nomo Antream ${nomoAntream}, bipo`);

  const handleNextAntream = () => {
    const nextNomoAntream = parseInt(nomoAntream) + 1;
    setNomoAntream(String(nextNomoAntream).padStart(2, "0"));
    setText(`Nomo Antream ${String(nextNomoAntream).padStart(2, "0")}, bipo`);
  };

  return (
    <div>
      <h1>Nomo Antream: {nomoAntream}</h1>
      <button onClick={handleNextAntream}>Next Antream</button>
    </div>
  );
}