"use client";

import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import BattleCard from "@/components/BattleCard";
import RegisterBattle from "@/components/RegisterBattle";
import { useBattles } from "@/api/useBattles";
import { Key } from "react";

const Battles = () => {
  const { data: battles = [] } = useBattles();

  const sortedBattles = battles?.sort(
    (a: { timestamp: string }, b: { timestamp: string }) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

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
          {sortedBattles?.map((battle: any) => (
            <BattleCard battle={battle} key={battle?.id} />
          ))}
        </VStack>
      </Box>
      <RegisterBattle />
    </HStack>
  );
};

export default Battles;
