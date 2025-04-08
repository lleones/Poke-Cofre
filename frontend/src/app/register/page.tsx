"use client";

import { Box, Button, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  nome: string;
  senha: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (body) => {
    fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  };

  return (
    <Box
      bgColor="#F6F5FB"
      color="#00010D"
      overflowY="auto"
      h="100vh"
      w="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack
        bg="white"
        padding="24px"
        borderRadius="md"
        margin="auto"
        maxW="500px"
        border="1px solid"
        borderColor="borderColor"
        align="left"
      >
        <Heading
          fontFamily="inherit"
          textTransform="uppercase"
          mb={1}
          textAlign="center"
          fontSize="xl"
        >
          Registro de Treinador
        </Heading>
        <Input
          border="1px solid"
          borderColor="borderColor"
          bg="#F6F5FB"
          paddingX="16px"
          placeholder="username"
          {...register("nome", { required: true })}
        />
        {errors.nome && (
          <Text color="red" fontSize="xs">
            O nome é obrigatório
          </Text>
        )}
        <Input
          mt={2}
          border="1px solid"
          borderColor="borderColor"
          bg="#F6F5FB"
          paddingX="16px"
          placeholder="senha"
          type="password"
          {...register("senha", { required: true })}
        />
        {errors.senha && (
          <Text color="red" fontSize="xs">
            A senha é obrigatória
          </Text>
        )}
        <Button
          mt={4}
          type="submit"
          onClick={handleSubmit(onSubmit)}
          bgColor="color3"
          color="white"
        >
          Registrar
        </Button>
      </VStack>
    </Box>
  );
};

export default Register;
