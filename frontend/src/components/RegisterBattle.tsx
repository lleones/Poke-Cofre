import useUserStore from "@/hooks/useUserStore";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { usePokemons } from "@/api/usePokemons";
import Image from "next/image";
import { useMemo } from "react";

type Inputs = {
  winnerTrainerId: string;
  loserTrainerId: string;
  winnerPokemonId: string;
  loserPokemonId: string;
};

const RegisterBattle = () => {
  const { token } = useUserStore();
  const { handleSubmit, setValue, watch } = useForm<Inputs>();
  const queryClient = useQueryClient();
  const { data: allPokemons = [] } = usePokemons();

  const selectedWinnerId = watch("winnerPokemonId");
  const selectedLoserId = watch("loserPokemonId");

  const winnerPokemonInfo = useMemo(() => {
    const selected = allPokemons.find((p) => p.id === selectedWinnerId);
    return selected ? JSON.parse(selected.info) : null;
  }, [selectedWinnerId, allPokemons]);

  const loserPokemonInfo = useMemo(() => {
    const selected = allPokemons.find((p) => p.id === selectedLoserId);
    return selected ? JSON.parse(selected.info) : null;
  }, [selectedLoserId, allPokemons]);

  const onSubmit: SubmitHandler<Inputs> = (body) => {
    fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/batalhas`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(() => queryClient.invalidateQueries({ queryKey: ["batalhas"] }))
      .catch((error) => {
        console.error("Erro:", error);
      });
  };

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
      as="form"
      onSubmit={handleSubmit(onSubmit)}
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
        Registrar batalha
      </Heading>
      <VStack paddingBottom="24px" w="full" gap={6}>
        <VStack w="full" align="left">
          <Text>Vencedor</Text>
          <HStack>
            {winnerPokemonInfo && (
              <Center
                bgColor="#F2F2F2"
                border="1px solid"
                borderColor="borderColor"
                borderRadius="md"
                h="40px"
                w="40px"
              >
                <Image
                  alt={winnerPokemonInfo.name}
                  src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${winnerPokemonInfo.id
                    .toString()
                    .padStart(3, "0")}.png`}
                  width={40}
                  height={40}
                />
              </Center>
            )}
            <Select
              placeholder="Selecione um pokémon"
              onChange={(e) => {
                const { pokemon, trainer } = JSON.parse(e.target.value);
                setValue("winnerPokemonId", pokemon);
                setValue("winnerTrainerId", trainer);
              }}
            >
              {allPokemons.map((pokemon, index) => {
                const { info, trainerId } = pokemon;
                const { name } = info;
                return (
                  <option
                    key={index}
                    value={JSON.stringify({
                      pokemon: pokemon.id,
                      trainer: pokemon.trainerId,
                    })}
                  >
                    {name} (de {trainerId})
                  </option>
                );
              })}
            </Select>
          </HStack>
        </VStack>

        <VStack w="full" align="left">
          <Text>Derrotado</Text>
          <HStack>
            {loserPokemonInfo && (
              <Center
                bgColor="#F2F2F2"
                border="1px solid"
                borderColor="borderColor"
                borderRadius="md"
                h="40px"
                w="40px"
              >
                <Image
                  alt={loserPokemonInfo.name}
                  src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${loserPokemonInfo.id
                    .toString()
                    .padStart(3, "0")}.png`}
                  width={40}
                  height={40}
                />
              </Center>
            )}
            <Select
              placeholder="Selecione um Pokémon"
              onChange={(e) => {
                const { pokemon, trainer } = JSON.parse(e.target.value);
                setValue("loserPokemonId", pokemon);
                setValue("loserTrainerId", trainer);
              }}
            >
              {allPokemons.map((pokemon, index) => {
                const { info, trainerId } = pokemon;
                const { name } = info;
                return (
                  <option
                    key={index}
                    value={JSON.stringify({
                      pokemon: pokemon.id,
                      trainer: pokemon.trainerId,
                    })}
                  >
                    {name} (de {trainerId})
                  </option>
                );
              })}
            </Select>
          </HStack>
        </VStack>
      </VStack>

      <Button bg="color3" color="white" type="submit">
        Registrar
      </Button>
    </VStack>
  );
};

export default RegisterBattle;
