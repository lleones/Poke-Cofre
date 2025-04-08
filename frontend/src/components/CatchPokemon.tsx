import { useCatchPokemon } from "@/api/usePokemons";
import useUserStore from "@/hooks/useUserStore";
import { Button, Heading, HStack, Input, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  nickname: string;
  trainerId: string;
};

const CatchPokemon = () => {
  const {
    trainer: { id: trainerId },
  } = useUserStore();

  const { mutate } = useCatchPokemon();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data);
  };

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: { trainerId },
  });

  return (
    <VStack
      align="left"
      gap={4}
      position="sticky"
      top="100"
      bg="#F6F5FB"
      zIndex={2}
      paddingBottom={8}
    >
      <Heading fontFamily="inherit" textTransform="uppercase" fontSize="xl">
        Capturar pokémon
      </Heading>
      <HStack onSubmit={handleSubmit(onSubmit)} as="form">
        <Input placeholder="Nome do Pokémon" bg="white" {...register("name")} />
        <Input placeholder="Apelido" bg="white" {...register("nickname")} />
        <Button bgColor="color3" color="white" type="submit">
          +
        </Button>
      </HStack>
    </VStack>
  );
};

export default CatchPokemon;
