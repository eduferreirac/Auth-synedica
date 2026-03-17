"use client";

import { Flex } from "@chakra-ui/react";
import { QrCodeGenerator } from "../components/qr/QrCodeGenerator";

export default function QrCodePage() {
  return (
    <Flex
      bg="var(--bg-body)"
      minH="100vh"
      align="center"
      justify="center"
      px="24px"
      py="40px"
    >
      <QrCodeGenerator />
    </Flex>
  );
}
