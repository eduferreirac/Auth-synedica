"use client";

import { useEffect, useState } from "react";

export type Screen = "confirmation" | "loading" | "result";

const PHRASES = ["Starting...", "Validating Batch...", "Checking IP...", "Generating Hash...", "Finishing..."];

type LocationResult = {
  ip: string;
  region: string;
};

async function fetchWithTimeout(url: string, timeoutMs = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function resolveUserLocation(): Promise<LocationResult> {
  try {
    const res = await fetchWithTimeout("https://ipapi.co/json/");
    if (res.ok) {
      const data = (await res.json()) as {
        ip?: string;
        country_name?: string;
      };
      if (data.ip || data.country_name) {
        return {
          ip: data.ip ?? "Unknown",
          region: data.country_name ?? "Unknown",
        };
      }
    }
  } catch {
    // fall through to next provider
  }

  try {
    const res = await fetchWithTimeout("https://ipwho.is/");
    if (res.ok) {
      const data = (await res.json()) as {
        success?: boolean;
        ip?: string;
        country?: string;
      };
      if (data.success) {
        return {
          ip: data.ip ?? "Unknown",
          region: data.country ?? "Unknown",
        };
      }
    }
  } catch {
    // fall through to next provider
  }

  try {
    const res = await fetchWithTimeout("https://api.ipify.org?format=json");
    if (res.ok) {
      const data = (await res.json()) as { ip?: string };
      return {
        ip: data.ip ?? "Unknown",
        region: "Unknown",
      };
    }
  } catch {
    // fall through to default return
  }

  return { ip: "Unknown", region: "Unknown" };
}

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
          const location = await resolveUserLocation();
          setUserIp(location.ip);
          setUserRegion(location.region);
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
