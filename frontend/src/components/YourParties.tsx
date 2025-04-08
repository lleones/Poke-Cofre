import { Button, Flex, Heading, useDisclosure, VStack } from "@chakra-ui/react";
import Party from "./Party";
import { useDeleteParty, useParties } from "@/api/useParties";
import PartyModal from "./PartyModal";
import useUserStore from "@/hooks/useUserStore";

const YourParties = () => {
  const {
    trainer: { id: trainerId },
  } = useUserStore();
  const { data: parties } = useParties();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const yourParty = parties?.find(
    (party: { trainerId: string }) => party.trainerId === trainerId
  );

  const hasParties = Array.isArray(parties) && parties?.length > 0 && yourParty;

  const { mutate } = useDeleteParty();

  return (
    <VStack
      align="left"
      bg="white"
      borderLeft="1px solid"
      borderColor="borderColor"
      h="full"
      w="full"
      maxW="376px"
      color="#00010D"
      paddingX="24px"
      gap={0}
      overflowY="auto"
    >
      <PartyModal isOpen={isOpen} onClose={onClose} party={yourParty} />
      <Flex align="center" paddingTop="48px" paddingBottom="24px">
        <Heading
          fontFamily="inherit"
          textTransform="uppercase"
          position="sticky"
          top="0"
          bg="white"
          w="full"
          fontSize="xl"
        >
          Sua equipe
        </Heading>

        <Button
          bg={!hasParties ? "color3" : "color4"}
          color="white"
          marginLeft="auto"
          paddingX={8}
          onClick={onOpen}
        >
          {!hasParties ? "Criar equipe" : "Editar equipe"}
        </Button>
      </Flex>

      {yourParty && (
        <VStack paddingBottom="24px">
          <Party
            party={{
              ...yourParty,
              trainerId: yourParty?.trainerId || "default-trainer-id",
            }}
          />
        </VStack>
      )}

      {yourParty && (
        <Button bg="color1" color="white" onClick={() => mutate(yourParty?.id)}>
          Remover sua equipe atual
        </Button>
      )}
    </VStack>
  );
};

export default YourParties;
