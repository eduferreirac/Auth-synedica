import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { activeCompany } from "@/app/config/company";

type ConfirmationScreenProps = {
  onConfirm: () => void;
};

export function ConfirmationScreen({ onConfirm }: ConfirmationScreenProps) {
  return (
    <Box maxW="440px" w="100%" textAlign="center">
      <Heading color="var(--text-main)" fontSize="28px" fontWeight="900" letterSpacing="-1px" mb="16px">
        {activeCompany.verificationTitle}
      </Heading>
      <Text color="var(--text-sub)" fontSize="15px" mb="35px" lineHeight="1.6">
        {activeCompany.verificationDescription}
      </Text>
      <Button
        w="100%"
        h="unset"
        py="15px"
        borderRadius="20px"
        fontSize="14px"
        fontWeight="900"
        bg="var(--error)"
        color="white"
        boxShadow="0 10px 20px rgba(190, 18, 60, 0.2)"
        _hover={{ bg: "var(--error)" }}
        _active={{ transform: "scale(0.97)" }}
        onClick={onConfirm}
      >
        {activeCompany.confirmButtonLabel}
      </Button>
    </Box>
  );
}
