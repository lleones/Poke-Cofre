"use client";

import useUserStore from "@/hooks/useUserStore";
import { Box, Button, Heading, HStack, Input, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useDeleteTrainer,
  useEditTrainer,
  useTrainers,
} from "@/api/useTrainers";

type Inputs = {
  nome: string;
  id: string;
};

const Profile = () => {
  const {
    trainer: { id, nome },
  } = useUserStore();

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: { nome, id },
  });

  const { mutate: editTrainer } = useEditTrainer();
  const { mutate: deleteTrainer } = useDeleteTrainer();

  const onDeleteTrainer = (id: string) => {
    deleteTrainer(id);
  };

  const onEditTrainer: SubmitHandler<Inputs> = (body) => {
    editTrainer(body);
  };

  return (
    <HStack w="full" h="100vh" gap="0">
      <Box bgColor="#F6F5FB" w="full" h="full" color="#00010D" overflowY="auto">
        <VStack
          align="left"
          margin="auto"
          maxW="600px"
          as="form"
          onSubmit={handleSubmit(onEditTrainer)}
        >
          <Heading
            textTransform="uppercase"
            fontFamily="inherit"
            paddingTop="48px"
            fontSize="2xl"
            position="sticky"
            top="0"
            bg="#F6F5FB"
          >
            Perfil
          </Heading>
          <VStack
            align="left"
            marginTop={4}
            position="sticky"
            top="109"
            bg="#F6F5FB"
            paddingBottom={8}
          >
            <Input placeholder="Nome" bg="white" {...register("nome")} />
            <Button bg="color4" color="white" type="submit">
              Atualizar
            </Button>
            <Button
              bg="color1"
              color="white"
              onClick={() => onDeleteTrainer(id)}
            >
              Excluir conta
            </Button>
          </VStack>
        </VStack>
      </Box>
    </HStack>
  );
};

export default Profile;
