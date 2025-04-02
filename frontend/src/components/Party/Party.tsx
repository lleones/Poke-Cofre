import { HStack, Text, VStack } from "@chakra-ui/react";
import PokemonParty from "../PokemonParty";

interface PartyProps {
  title: string;
}

const Party = ({ title }: PartyProps) => {
  return (
    <VStack bg="#a4a4a4" padding="12px 16px" color="white" align="left" borderRadius="lg" gap={2}>
      <Text>{title}</Text>
      <HStack>
        {Array.from({ length: 6 }).map((_, index) => (
          <PokemonParty src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/002.png" key={index} />
        ))}
      </HStack>
    </VStack>
  );
};

export default Party;
