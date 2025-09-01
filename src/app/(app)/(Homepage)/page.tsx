"use client";
import { useAccount } from "@/libs/hooks/home/useHome";
import { JSX } from "react";
import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";

export default function HomePage(): JSX.Element {
  const [noBarang, setNoBarang] = useState<string>("01");
  const cookies = new Cookies();

  const token = cookies.get("token");
  const {
    data: accountInfo,
    isValidating: isAccountInfo,
    error: accountError,
  } = useAccount(true, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  // Debugging log
  useEffect(() => {
    if (accountInfo) {
      console.log("✅ Data account:", accountInfo);
    }
    if (accountError) {
      console.error("❌ Error:", accountError);
    }
  }, [accountInfo, accountError]);

  const speakText = (message: string) => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = "id-ID";
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;

      speechSynthesis.speak(utterance);
    } else {
      alert("Browser Anda tidak mendukung text-to-speech");
    }
  };

  const handleNextBarang = () => {
    const nextNoBarang = parseInt(noBarang) + 1;
    const formattedNumber = String(nextNoBarang).padStart(3, "0");

    setNoBarang(String(nextNoBarang).padStart(2, "0"));

    const ttsMessage = `Silakan Cek kembali Nomor barang Anda ${formattedNumber}, Terima kasih`;
    speakText(ttsMessage);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
        No Barang: {noBarang}
      </h1>

      <button
        onClick={handleNextBarang}
        style={{
          padding: "15px 30px",
          fontSize: "1.2rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = "#0056b3")
        }
        onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = "#007bff")
        }
      >
        Next Barang
      </button>

      <div style={{ marginTop: "20px", color: "#666" }}>
        <p>
          Pesan TTS: "Silakan Cek kembali no data Stationary Anda{" "}
          {String(parseInt(noBarang)).padStart(2, "0")}, Terima kasih"
        </p>
      </div>
    </div>
  );
}
