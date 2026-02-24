"use client";

import { useEffect, useState } from "react";

export type Screen = "confirmation" | "loading" | "result";

const PHRASES = ["Starting...", "Validating Batch...", "Checking IP...", "Generating Hash...", "Finishing..."];

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
  const [statusText, setStatusText] = useState("Encrypting Tunnel...");
  const [randomSerial, setRandomSerial] = useState("000000000000");
  const [hashCode, setHashCode] = useState("");
  const [userIp, setUserIp] = useState("...");
  const [userRegion, setUserRegion] = useState("...");

  const startProcess = () => {
    setProgress(0);
    setStatusText("Encrypting Tunnel...");
    setUserIp("...");
    setUserRegion("...");
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
            const res = await fetch("https://ipwho.is/");
            const data = (await res.json()) as {
              success: boolean;
              ip?: string;
              city?: string;
              region?: string;
              country?: string;
            };

            if (data.success) {
              setUserIp(data.ip ?? "Unknown");
              const regionParts = [data.city, data.region, data.country].filter(Boolean);
              setUserRegion(regionParts.join(", ") || "Unknown");
            } else {
              setUserIp("Unknown");
              setUserRegion("Unknown");
            }
          } catch {
            setUserIp("Unknown");
            setUserRegion("Unknown");
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
    userRegion,
    startProcess,
  };
}
