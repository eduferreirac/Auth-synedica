"use client";

import { useEffect, useState } from "react";

export type Screen = "confirmation" | "loading" | "result";

const PHRASES = ["Iniciando...", "Validando Lote...", "Checando IP...", "Gerando Hash...", "Finalizando..."];

function generateRandomSerial() {
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join("");
}

function generateHash() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let hash = "SHA256-AUTH:";

  for (let i = 0; i < 32; i += 1) {
    hash += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return hash;
}

export function useAuthFlow() {
  const [screen, setScreen] = useState<Screen>("confirmation");
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Criptografando Túnel...");
  const [randomSerial, setRandomSerial] = useState("000000000000");
  const [hashCode, setHashCode] = useState("");
  const [userIp, setUserIp] = useState("...");

  const startProcess = () => {
    setProgress(0);
    setStatusText("Criptografando Túnel...");
    setUserIp("...");
    setHashCode("");
    setRandomSerial("000000000000");
    setScreen("loading");
  };

  useEffect(() => {
    if (screen !== "loading") {
      return;
    }

    let p = 0;

    const interval = setInterval(() => {
      p += 1;
      setProgress(p);

      if (p % 20 === 0) {
        const idx = Math.floor(p / 21);
        setStatusText(PHRASES[Math.min(idx, PHRASES.length - 1)]);
      }

      if (p >= 100) {
        clearInterval(interval);
        setRandomSerial(generateRandomSerial());
        setHashCode(generateHash());
        void (async () => {
          try {
            const res = await fetch("https://api.ipify.org?format=json");
            const data = (await res.json()) as { ip: string };
            setUserIp(data.ip);
          } catch {
            setUserIp("187.64.12.102");
          }
        })();
        setScreen("result");
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [screen]);

  return {
    screen,
    progress,
    statusText,
    randomSerial,
    hashCode,
    userIp,
    startProcess,
  };
}
