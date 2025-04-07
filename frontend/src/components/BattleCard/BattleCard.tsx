import { useEffect, useState } from "react";
import useUserStore from "@/hooks/useUserStore";
import { Circle, HStack, Text, VStack, Spinner } from "@chakra-ui/react";
import Image from "next/image";

interface BattleCardProps {
  battle: any;
}

const BattleCard = ({ battle }: BattleCardProps) => {
  const { winnerPokemonId, winnerTrainerId, loserPokemonId, loserTrainerId } =
    battle || {};
  const { token } = useUserStore();

  const [winner, setWinner] = useState<any>(null);
  const [loser, setLoser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchPokemon = async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/pokemons/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return await response.json();
  };

  const fetchTrainer = async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/treinadores/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return await response.json();
  };

  useEffect(() => {
    const loadBattleData = async () => {
      try {
        const [wP, wT, lP, lT] = await Promise.all([
          fetchPokemon(winnerPokemonId),
          fetchTrainer(winnerTrainerId),
          fetchPokemon(loserPokemonId),
          fetchTrainer(loserTrainerId),
        ]);

        setWinner({
          pokemon: JSON.parse(wP.info),
          nickname: wP.nickname,
          trainer: wT,
        });

        setLoser({
          pokemon: JSON.parse(lP.info),
          nickname: lP.nickname,
          trainer: lT,
        });
      } catch (err) {
        console.error("Erro ao carregar dados da batalha:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) loadBattleData();
  }, [token]);

  if (loading || !winner || !loser) {
    return <Spinner />;
  }

  return (
    <HStack
      w="full"
      bg="white"
      color="black"
      padding="16px"
      borderRadius="xl"
      border="1px solid rgba(0, 0, 0, 0.12)"
      gap={4}
      justifyContent="space-between"
    >
      {/* Winner */}
      <VStack align="left">
        <Text color="#62D98B">Winner</Text>
        <HStack>
          <Circle
            size="50px"
            bgColor="#F2F2F2"
            border="1px solid rgba(0, 0, 0, 0.12)"
          >
            <Image
              alt="Pokémon ganhador"
              height={30}
              width={30}
              src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${String(
                winner.pokemon.id
              ).padStart(3, "0")}.png`}
            />
          </Circle>
          <VStack align="left" gap={0}>
            <Text>{winner.trainer.nome}</Text>
            <Text fontWeight="bold" fontSize={20}>
              {winner.pokemon.name}
            </Text>
          </VStack>
        </HStack>
      </VStack>

      <Text>vs.</Text>

      {/* Loser */}
      <VStack align="flex-end">
        <Text color="#F2506E">Loser</Text>
        <HStack>
          <VStack align="flex-end" gap={0}>
            <Text>{loser.trainer.nome}</Text>
            <Text fontWeight="bold" fontSize={20}>
              {`${loser?.pokemon?.nickname || ""} (${loser.pokemon.name})`}
            </Text>
          </VStack>
          <Circle
            size="50px"
            bgColor="#F2F2F2"
            border="1px solid rgba(0, 0, 0, 0.12)"
          >
            <Image
              alt="Pokémon perdedor"
              height={30}
              width={30}
              src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${String(
                loser.pokemon.id
              ).padStart(3, "0")}.png`}
            />
          </Circle>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default BattleCard;
