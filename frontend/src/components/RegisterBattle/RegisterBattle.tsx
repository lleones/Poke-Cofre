import useUserStore from "@/hooks/useUserStore";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Heading, Select, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Image from "next/image";

type Inputs = {
  winnerTrainerId: "string";
  loserTrainerId: "string";
  winnerPokemonId: "string";
  loserPokemonId: "string";
};

type RegisterBattleProps = {
  reload: () => void;
};

const RegisterBattle = ({ reload }: RegisterBattleProps) => {
  const [allPokemons, setAllPokemons] = useState<any[]>([]);
  const { token } = useUserStore();
  const { handleSubmit, setValue } = useForm<Inputs>();

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

  const onSubmit: SubmitHandler<Inputs> = (body) => {
    fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/batalhas`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => reload())
      .catch((error) => {
        console.error("Erro:", error);
      });
  };

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
          <Select
            onChange={(e) => {
              const pokemon = JSON.parse(e.target.value);
              setValue("winnerPokemonId", pokemon.pokemon);
              setValue("winnerTrainerId", pokemon.trainer);
            }}
          >
            {allPokemons.map((pokemon, index) => {
              const { info, trainerId } = pokemon;
              const { name, id } = JSON.parse(info);
              console.log(JSON.parse(info));
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
        </VStack>

        <VStack w="full" align="left">
          <Text>Derrotado</Text>
          <Select
            onChange={(e) => {
              const pokemon = JSON.parse(e.target.value);
              setValue("loserPokemonId", pokemon.pokemon);
              setValue("loserTrainerId", pokemon.trainer);
            }}
          >
            {allPokemons.map((pokemon, index) => {
              const { info, trainerId } = pokemon;
              const { name, id } = JSON.parse(info);
              console.log(JSON.parse(info));
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
        </VStack>
      </VStack>

      <Button bg="#F2B035" color="white" type="submit">
        Registrar
      </Button>
    </VStack>
  );
};

export default RegisterBattle;
