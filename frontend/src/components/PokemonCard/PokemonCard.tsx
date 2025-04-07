import { HStack, Text, VStack, Button, useDisclosure } from "@chakra-ui/react";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import RenamePokemonModal from "../RenamePokemonModal";
import { useDeletePokemon } from "@/api/usePokemons";

interface Pokemon {
  id: string;
  info: {
    id: number;
    name: string;
  };
  nickname?: string;
}

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const { id, info, nickname } = pokemon;
  const { id: number, name } = info;
  const { onOpen, onClose, isOpen } = useDisclosure();

  const { mutate: deletePokemon } = useDeletePokemon();

  const onDelete = (id: string) => {
    deletePokemon(id);
  };

  return (
    <HStack
      gap="0"
      h="full"
      overflow="hidden"
      border="1px solid"
      borderColor="borderColor"
      borderRadius="lg"
      bg="white"
      w="full"
    >
      <VStack
        padding="16px 16px"
        title="Aqui vai ter um 'tooltip' com as estatísticas desse pokémon"
        justifyContent="space-between"
        h="full"
        w="full"
        gap={0}
      >
        <Text fontWeight="bold" textAlign="left" w="full" marginBottom={4}>
          {`#${String(number)?.padStart(3, "0")}`}
        </Text>
        <Image
          alt="Pokémon"
          width={100}
          height={100}
          src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${String(
            number
          ).padStart(3, "0")}.png`}
        />
        <Text
          textTransform="uppercase"
          fontWeight="bold"
          fontSize="lg"
          marginTop={4}
        >
          {nickname || name}
        </Text>
        {nickname && <Text>{name}</Text>}
      </VStack>
      <VStack h="full" gap={0}>
        <Button
          title="Editar"
          bg="color4"
          color="white"
          borderRadius="none"
          height="50%"
          _hover={{ bg: "gray.500" }}
          size="xs"
          w="full"
          onClick={onOpen}
        >
          <FontAwesomeIcon icon={faPen} />
        </Button>
        <Button
          title="Excluir"
          bg="color1"
          color="white"
          borderRadius="none"
          height="50%"
          _hover={{ bg: "gray.500" }}
          size="xs"
          w="full"
          onClick={() => onDelete(id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </VStack>
      <RenamePokemonModal isOpen={isOpen} onClose={onClose} pokemon={pokemon} />
    </HStack>
  );
};

export default PokemonCard;
