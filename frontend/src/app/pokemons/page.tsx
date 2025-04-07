"use client";

import { useEffect, useState } from "react";
import PokemonCard from "@/components/PokemonCard";
import YourParties from "@/components/YourParties";
import useUserStore from "@/hooks/useUserStore";
import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  nickname: string;
  trainerId: string;
};

const Pokemons = () => {
  const {
    token,
    trainer: { id: trainerId },
  } = useUserStore();

  console.log(trainerId);

  const [allPokemons, setAllPokemons] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { trainerId } });

  const fetchPokemons = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME}/pokemons`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (Array.isArray(data)) setAllPokemons(data);
    } catch (error) {
      console.error("Erro ao buscar os Pokémons:", error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [token]);

  const onCatchPokemon: SubmitHandler<Inputs> = (body) => {
    fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/pokemons`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(() => {
        fetchPokemons();
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  };

  return (
    <HStack w="full" h="100vh" gap="0">
      <Box bgColor="#F6F5FB" w="full" h="full" color="#00010D" overflowY="auto">
        <VStack align="left" margin="auto" maxW="600px" gap={8}>
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
          <VStack align="left" gap={4}>
            <Heading
              fontFamily="inherit"
              textTransform="uppercase"
              fontSize="xl"
            >
              Capturar pokémon
            </Heading>
            <HStack onSubmit={handleSubmit(onCatchPokemon)} as="form">
              <Input
                placeholder="Nome do Pokémon"
                bg="white"
                {...register("name")}
              />
              <Input
                placeholder="Apelido"
                bg="white"
                {...register("nickname")}
              />
              
              <Button bgColor="blue" color="white" type="submit">
                +
              </Button>
            </HStack>
          </VStack>
          <Wrap>
            {allPokemons?.map((pokemon, index) => (
              <WrapItem key={index}>
                <PokemonCard pokemon={pokemon} />
              </WrapItem>
            ))}
          </Wrap>
        </VStack>
      </Box>
      <YourParties />
    </HStack>
  );
};

export default Pokemons;
