import { Heading, VStack } from "@chakra-ui/react";
import Party from "../Party";

const YourParties = () => {
  return (
    <VStack
      align="left"
      bg="white"
      borderLeft="1px solid rgba(0, 0, 0, 0.12)"
      h="full"
      w="full"
      maxW="376px"
      color="#00010D"
      paddingX="24px"
      gap={0}
      overflowY="auto"
    >
      <Heading
        fontFamily="inherit"
        textTransform="uppercase"
        position="sticky"
        top="0"
        bg="white"
        paddingTop="48px"
        paddingBottom="24px"
        w="full"
        fontSize="xl"
      >
        Suas equipes
      </Heading>
      <VStack paddingBottom="24px">
        {Array.from({ length: 12 }).map((_, index) => (
          <Party title={`Equipe ${index + 1}`} key={index} />
        ))}
      </VStack>
    </VStack>
  );
};

export default YourParties;
