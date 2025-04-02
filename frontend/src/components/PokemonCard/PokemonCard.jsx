import { Center, HStack, Text, VStack } from "@chakra-ui/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const PokemonCard = ({ number }) => {
  return (
    <HStack
      gap="0"
      h="full"
      overflow="hidden"
      border="1px solid rgba(0, 0, 0, 0.12)"
      borderRadius="lg"
    >
      <VStack bg="white" padding="16px 16px">
        <Text fontWeight="bold" textAlign="left" w="full">{`#${number}`}</Text>
        <Image
          alt="Pokémon"
          width={60}
          height={60}
          src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png"
        ></Image>
        <Text>Bulbasaur</Text>
      </VStack>
      <Center bg="#f5543c" w="20px" h="full" color="white">
        <FontAwesomeIcon icon={faPlus} />
      </Center>
    </HStack>
  );
};

export default PokemonCard;
