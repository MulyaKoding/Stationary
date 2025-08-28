import { useEffect, useState } from "react"

interface Props {}

export default function Home() {
  const [nomorAntrean, setNomorAntrean] = useState("001")
  const [text, setText] = useState<string>(`Nomor Antrean ${nomorAntrean}, Dipersilahkan masuk`)

  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'id-ID'
    utterance.rate = 1
    speechSynthesis.speak(utterance)
  },[text])

  const handleNextAntrean = () => {
    const nextNomorAntrean = parseInt(nomorAntrean) + 1
    setNomorAntrean(String(nextNomorAntrean).padStart(3, '0'))
    setText(`Nomor Antrean ${String(nextNomorAntrean).padStart(3, '0')}`)
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
     <h1>Nomor Antrean: {nomorAntrean}</h1>
     <button onClick={handleNextAntrean}>Next Antrean</button>
    </div>
  );
}
