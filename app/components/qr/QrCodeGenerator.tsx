"use client";

import { useRef, useState } from "react";
import { Box, Button, Flex, Heading, Input, QrCode, Stack, Text } from "@chakra-ui/react";
import { useCompany } from "@/app/providers";

export function QrCodeGenerator() {
  const company = useCompany();
  const [qrValue, setQrValue] = useState(() => (typeof window === "undefined" ? "" : window.location.href));
  const qrContainerRef = useRef<HTMLDivElement | null>(null);

  async function handleDownload() {
    const svgElement = qrContainerRef.current?.querySelector("svg");
    if (!svgElement || !qrValue) {
      return;
    }

    const serializedSvg = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([serializedSvg], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);

    try {
      const image = new Image();
      image.decoding = "async";

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("Failed to render QR code image"));
        image.src = svgUrl;
      });

      const canvas = document.createElement("canvas");
      canvas.width = 1000;
      canvas.height = 1000;

      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Canvas context is not available");
      }

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      const pngUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `${company.id}-qr-code.png`;
      link.click();
    } finally {
      URL.revokeObjectURL(svgUrl);
    }
  }

  return (
    <Box
      w="100%"
      maxW="520px"
      bg="white"
      borderRadius="40px"
      px={{ base: "24px", md: "32px" }}
      py={{ base: "32px", md: "40px" }}
      boxShadow="0 40px 80px -15px rgba(0, 0, 0, 0.08)"
      border="1px solid #f1f5f9"
    >
      <Stack gap="6" align="center">
        <Box textAlign="center">
          <Heading color="var(--text-main)" fontSize={{ base: "24px", md: "28px" }} fontWeight="900" letterSpacing="-1px">
            QR CODE
          </Heading>
          <Text color="var(--text-sub)" fontSize="14px" mt="10px" lineHeight="1.6">
            Generate a QR code from any URL and download it as an image.
          </Text>
        </Box>

        <QrCode.Root value={qrValue} size="xl">
          <Stack w="full">
            <Flex justify="center" ref={qrContainerRef}>
              <QrCode.Frame bg="white" p="14px" borderRadius="24px" border="1px solid #e2e8f0">
                <QrCode.Pattern color="#0f172a" />
              </QrCode.Frame>
            </Flex>

            <Input
              value={qrValue}
              onChange={(event) => setQrValue(event.target.value)}
              placeholder="https://example.com"
              size="lg"
              bg="white"
              borderRadius="18px"
              borderColor="#e2e8f0"
              _focusVisible={{ borderColor: "var(--primary)", boxShadow: "0 0 0 1px var(--primary)" }}
            />

            <Button
              w="full"
              h="unset"
              py="15px"
              borderRadius="18px"
              fontSize="14px"
              fontWeight="900"
              bg="var(--primary)"
              color="white"
              _hover={{ bg: "var(--primary)" }}
              _active={{ transform: "scale(0.98)" }}
              disabled={!qrValue}
              onClick={() => {
                void handleDownload();
              }}
            >
              Download QR Code
            </Button>
          </Stack>
        </QrCode.Root>
      </Stack>
    </Box>
  );
}
