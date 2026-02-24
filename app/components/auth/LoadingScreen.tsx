import { Box, Flex, Image, Text } from "@chakra-ui/react";

type LoadingScreenProps = {
  progress: number;
  statusText: string;
  logoAnimation: string;
};

export function LoadingScreen({ progress, statusText, logoAnimation }: LoadingScreenProps) {
  return (
    <Flex direction="column" align="center" w="100%" maxW="400px">
      <Image src="/group-3.svg" alt="Logo" w="130px" mb="40px" animation={logoAnimation} />
      <Box w="100%" h="8px" bg="#f1f5f9" borderRadius="20px" overflow="hidden" mb="20px">
        <Box h="100%" w={`${progress}%`} bg="linear-gradient(90deg, #d6a74f, #e9c46a)" borderRadius="20px" />
      </Box>
      <Text color="var(--text-sub)" fontSize="11px" fontWeight="900" textTransform="uppercase" letterSpacing="2px">
        {statusText}
      </Text>
    </Flex>
  );
}
