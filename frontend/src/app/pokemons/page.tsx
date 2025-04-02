import PokemonCard from "@/components/PokemonCard";
import YourParties from "@/components/YourParties";
import { Box, Heading, HStack, Wrap, WrapItem } from "@chakra-ui/react";

export default function Pokemons() {
  return (
    <HStack w="full" h="100vh" gap="0">
      <Box bgColor="#F6F5FB" w="full" h="full" color="#00010D" overflowY="auto">
        <Heading
          textTransform="uppercase"
          fontFamily="inherit"
          maxW="600px"
          margin="auto"
          paddingY="48px"
          fontSize="2xl"
          position="sticky"
          top="0"
          bg="#F6F5FB"
        >
          Pokémons
        </Heading>
        <Wrap maxW="600px" margin="auto">
          {Array.from({ length: 400 }).map((_, index) => (
            <WrapItem key={index}>
              <PokemonCard number={index + 1} />
            </WrapItem>
          ))}
        </Wrap>
      </Box>
      <YourParties />
    </HStack>
  );
}
