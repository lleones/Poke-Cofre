"use client";

import PokemonCard from "@/components/PokemonCard";
import YourParties from "@/components/YourParties";
import useUserStore from "@/hooks/useUserStore";
import { Box, Grid, GridItem, Heading, HStack, VStack } from "@chakra-ui/react";
import CatchPokemon from "@/components/CatchPokemon";
import { usePokemons } from "@/api/usePokemons";

const Pokemons = () => {
  const {
    trainer: { id: trainerId },
  } = useUserStore();

  const { data: pokemons } = usePokemons();

  const myPokemons = pokemons?.filter(
    (pokemon) => pokemon.trainerId === trainerId
  );

  console.log("*", myPokemons);

  return (
    <HStack w="full" h="100vh" gap="0">
      <Box bgColor="#F6F5FB" w="full" h="full" color="#00010D" overflowY="auto">
        <VStack align="left" margin="auto" maxW="600px">
          <Heading
            textTransform="uppercase"
            fontFamily="inherit"
            paddingTop="48px"
            fontSize="2xl"
            position="sticky"
            top="0"
            bg="#F6F5FB"
          >
            Pokémons
          </Heading>
          <CatchPokemon />
          <VStack
            align="left"
            marginTop={4}
            gap={4}
            position="sticky"
            top="109"
            bg="#F6F5FB"
            paddingBottom={8}
          >
            <Heading
              fontFamily="inherit"
              textTransform="uppercase"
              fontSize="xl"
            >
              Sua box
            </Heading>
            <Grid
              w="full"
              gap={2}
              templateColumns={{
                base: "100%",
                md: "repeat(1, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              marginBottom={16}
            >
              {myPokemons?.map((pokemon, index) => (
                <GridItem key={index}>
                  <PokemonCard pokemon={pokemon} />
                </GridItem>
              ))}
            </Grid>
          </VStack>
        </VStack>
      </Box>
      <YourParties />
    </HStack>
  );
};

export default Pokemons;
