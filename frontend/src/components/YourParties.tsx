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

  const hasParties = Array.isArray(parties) && parties?.length > 0;
  const yourParty = parties?.find(
    (party: { trainerId: string }) => party.trainerId === trainerId
  );

  console.log(yourParty, trainerId);

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
      <PartyModal isOpen={isOpen} onClose={onClose} party={parties?.[0]} />
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

      <VStack paddingBottom="24px">
        {parties?.map(
          (
            party: { pokemons: [string]; trainerId?: string },
            index: number
          ) => (
            <Party
              key={index}
              party={{
                ...party,
                trainerId: party.trainerId || "default-trainer-id",
              }}
            />
          )
        )}
      </VStack>

      <Button bg="color1" color="white" onClick={() => mutate(yourParty?.id)}>
        Remover sua equipe atual
      </Button>
    </VStack>
  );
};

export default YourParties;
