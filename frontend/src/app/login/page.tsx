"use client";

import useUserStore from "@/hooks/useUserStore";
import { Box, Button, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  nome: string;
  senha: string;
};

const Login = () => {
  const router = useRouter();
  const { setToken, setTrainer } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (body) => {
    fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        setToken(data.token);
        setTrainer(data.treinador);
        router.push("/pokemons");
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
        border="1px solid" borderColor="borderColor"
        align="left"
      >
        <Heading fontFamily="inherit" textTransform="uppercase" mb={1}>
          Login
        </Heading>
        <Input
          border="1px solid" borderColor="borderColor"
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
          type="password"
          mt={2}
          border="1px solid" borderColor="borderColor"
          bg="#F6F5FB"
          paddingX="16px"
          placeholder="senha"
          {...register("senha", { required: true })}
        />
        {errors.senha && (
          <Text color="red" fontSize="xs">
            A senha é obrigatória
          </Text>
        )}
        <Text textAlign="center" fontSize="xs" color="#00010D" mt={2} cursor="pointer" onClick={() => router.push("/register")}>
          Não tem uma conta?
        </Text>
        <Button
          mt={2}
          type="submit"
          onClick={handleSubmit(onSubmit)}
          bgColor="color2"
          color="white"
        >
          Entrar
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
