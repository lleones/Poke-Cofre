"use client";

import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import BattleCard from "@/components/BattleCard";
import RegisterBattle from "@/components/RegisterBattle";
import useUserStore from "@/hooks/useUserStore";
import { useEffect, useState } from "react";

const Battles = () => {
  const { token } = useUserStore();
  const [battles, setBattles] = useState<any[]>([]);

  const fetchBattles = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME}/batalhas`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (Array.isArray(data)) setBattles(data);
    } catch (error) {
      console.error("Erro ao buscar os Pokémons:", error);
    }
  };

  useEffect(() => {
    fetchBattles();
  }, [token]);

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
          Histórico de batalhas
        </Heading>
        <VStack maxW="600px" margin="auto" paddingBottom="48px">
          {battles.map((battle, index) => (
            <BattleCard battle={battle} key={index} />
          ))}
        </VStack>
      </Box>
      <RegisterBattle reload={fetchBattles} />
    </HStack>
  );
};

export default Battles;
