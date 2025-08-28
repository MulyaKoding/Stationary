"use client";
import { JSX, useEffect, useState } from "react";
import React from "react";

export default function HomePage(): JSX.Element {
  const [noBarang, setNoBarang] = useState<string>("01");
  const [text, setText] = useState<string>(`No Barang ${noBarang}, bipo`);

  const speakText = (message: string) => {
    // Check if browser supports speech synthesis
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(message);
      
      // Set voice properties
      utterance.lang = 'id-ID'; // Indonesian language
      utterance.rate = 0.8; // Speaking speed
      utterance.pitch = 1; // Voice pitch
      utterance.volume = 1; // Volume
      
      // Speak the text
      speechSynthesis.speak(utterance);
    } else {
      alert('Browser Anda tidak mendukung text-to-speech');
    }
  };

  const handleNextBarang = () => {
    const nextNoBarang = parseInt(noBarang) + 1;
    const formattedNumber = String(nextNoBarang).padStart(3, "0"); // Changed to 3 digits (001, 002, etc.)
    
    setNoBarang(String(nextNoBarang).padStart(2, "0"));
    setText(`No Barang ${String(nextNoBarang).padStart(2, "0")}, bipo`);
    
    // Text-to-speech message
    const ttsMessage = `Nomor antrean ${formattedNumber}, dipersilahkan masuk`;
    speakText(ttsMessage);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>
        No Barang: {noBarang}
      </h1>
      <button 
        onClick={handleNextBarang}
        style={{
          padding: '15px 30px',
          fontSize: '1.2rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }}
        onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => (e.target as HTMLButtonElement).style.backgroundColor = '#0056b3'}
        onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => (e.target as HTMLButtonElement).style.backgroundColor = '#007bff'}
      >
        Next Barang
      </button>
      
      <div style={{ marginTop: '20px', color: '#666' }}>
        <p>Pesan TTS: "Silakan Cek kembali no data Stationary Anda {String(parseInt(noBarang) + 1).padStart(3, "0")}, Terima kasih"</p>
      </div>
    </div>
  );
}