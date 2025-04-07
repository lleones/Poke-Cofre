import { HStack, Text, VStack } from "@chakra-ui/react";
import PokemonParty from "../PokemonParty";
import { Key } from "react";
import useUserStore from "@/hooks/useUserStore";

interface PartyProps {
  party: { pokemons: [string]; trainerId: string };
}

const Party = ({ party }: PartyProps) => {
  const { pokemons, trainerId } = party;
  const { trainer } = useUserStore();

  const isYourParty = trainer.id === trainerId;

  return (
    <VStack
      bg={isYourParty ? "#a4a4a4" : "color5"}
      border="1px solid"
      borderColor="borderColor"
      padding="12px 16px"
      color="white"
      align="left"
      borderRadius="lg"
      gap={2}
      boxShadow="6px 10px 30px #0000000F"
    >
      {isYourParty && (
        <Text textTransform="uppercase" fontWeight="bold">
          Equipe atual
        </Text>
      )}
      <HStack>
        {Array.isArray(pokemons) &&
          pokemons?.map((id: string, index: Key | null | undefined) => (
            <PokemonParty pokemonId={id} key={index} src={""} />
          ))}
      </HStack>
    </VStack>
  );
};

export default Party;
