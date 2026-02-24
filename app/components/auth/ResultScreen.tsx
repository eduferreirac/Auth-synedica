import { Box, Flex, Heading, Text } from "@chakra-ui/react";

type ResultScreenProps = {
  userIp: string;
  userRegion: string;
  randomSerial: string;
  hashCode: string;
  containerAnimation: string;
};

export function ResultScreen({ userIp, userRegion, randomSerial, hashCode, containerAnimation }: ResultScreenProps) {
  const currentYear = new Date().getFullYear();
  const logisticsRows = [
    ["Serial Number", "NHGP281"],
    ["Expiration", "05/2029"],
    ["Region", userRegion],
  ] as const;

  return (
    <Flex direction="column" w="100%" maxW="420px" animation={containerAnimation}>
      <Box
        bg="white"
        borderRadius="40px"
        px="30px"
        py="40px"
        boxShadow="0 40px 80px -15px rgba(0, 0, 0, 0.08)"
        border="1px solid #f1f5f9"
        textAlign="center"
        position="relative"
      >
        <Flex
          w="70px"
          h="70px"
          bg="#ecfdf5"
          color="var(--success)"
          borderRadius="22px"
          align="center"
          justify="center"
          mx="auto"
          mb="20px"
          fontSize="30px"
          transform="rotate(-5deg)"
        >
          ✓
        </Flex>

        <Heading fontSize="20px" fontWeight="900">
          AUTHENTICITY CONFIRMED
        </Heading>
        <Text color="var(--success)" fontWeight="900" fontSize="11px" letterSpacing="1px">
          SECURE ANALYTICS VERIFIED
        </Text>

        <Box textAlign="left" mt="25px" bg="#f8fafc" p="25px" borderRadius="25px" border="1px solid #f1f5f9">
          <Text
            display="block"
            color="var(--primary)"
            fontSize="9px"
            fontWeight="900"
            letterSpacing="2px"
            textTransform="uppercase"
            mb="10px"
          >
            Logistics Trace
          </Text>

          {logisticsRows.map(([label, value], idx) => (
            <Flex
              key={label}
              justify="space-between"
              fontSize="13px"
              py="6px"
              borderBottom={idx === logisticsRows.length - 1 ? "none" : "1px solid rgba(0,0,0,0.03)"}
            >
              <Text color="var(--text-sub)" fontWeight="900">
                {label}
              </Text>
              <Text color="var(--text-main)" fontWeight="900">
                {value}
              </Text>
            </Flex>
          ))}
        </Box>

        <Box textAlign="left" mt="25px" bg="#f8fafc" p="25px" borderRadius="25px" border="1px solid #f1f5f9">
          <Text
            display="block"
            color="var(--primary)"
            fontSize="9px"
            fontWeight="900"
            letterSpacing="2px"
            textTransform="uppercase"
            mb="15px"
          >
            Security Credentials
          </Text>

          <Flex justify="space-between" fontSize="13px" py="6px" borderBottom="1px solid rgba(0,0,0,0.03)">
            <Text color="var(--text-sub)" fontWeight="900">
              Access IP
            </Text>
            <Text color="var(--text-main)" fontWeight="900">
              {userIp}
            </Text>
          </Flex>

          <Flex direction="column" gap="0" fontSize="13px" py="6px">
            <Text color="var(--text-sub)" fontWeight="900" textShadow="0 0 0 currentColor">
              Reference Key
            </Text>
            <Text color="var(--primary)" fontSize="16px" fontWeight="800" textShadow="0 0 0 currentColor">
              {randomSerial}
            </Text>
          </Flex>
        </Box>

        <Box
          bg="#0f172a"
          color="#94a3b8"
          p="15px"
          borderRadius="15px"
          fontFamily="Monaco, monospace"
          fontSize="10px"
          mt="15px"
          wordBreak="break-all"
          lineHeight="1.4"
          textAlign="left"
          border="1px solid #1e293b"
        >
          {hashCode}
        </Box>
      </Box>

      <Text textAlign="center" color="#94a3b8" fontSize="10px" mt="25px" fontWeight="900">
        ENCRYPTED VERIFICATION SYSTEM © {currentYear}
      </Text>
    </Flex>
  );
}
