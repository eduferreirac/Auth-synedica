"use client";

import { keyframes } from "@emotion/react";
import { Flex } from "@chakra-ui/react";
import { ConfirmationScreen } from "./components/auth/ConfirmationScreen";
import { LoadingScreen } from "./components/auth/LoadingScreen";
import { ResultScreen } from "./components/auth/ResultScreen";
import { useAuthFlow } from "./hooks/useAuthFlow";

const pulseLogo = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function Home() {
  const { screen, progress, statusText, randomSerial, hashCode, userIp, userRegion, startProcess } = useAuthFlow();

  return (
    <Flex
      bg="var(--bg-body)"
      minH="100vh"
      align="center"
      justify="center"
      px="24px"
      transition="background 0.8s ease"
    >
      {screen === "confirmation" ? <ConfirmationScreen onConfirm={startProcess} /> : null}

      {screen === "loading" ? (
        <LoadingScreen progress={progress} statusText={statusText} logoAnimation={`${pulseLogo} 2s infinite ease-in-out`} />
      ) : null}

      {screen === "result" ? (
        <ResultScreen
          userIp={userIp}
          userRegion={userRegion}
          randomSerial={randomSerial}
          hashCode={hashCode}
          containerAnimation={`${slideUp} 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)`}
        />
      ) : null}
    </Flex>
  );
}
