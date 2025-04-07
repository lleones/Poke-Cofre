import useUserStore from "@/hooks/useUserStore";
import {
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  Text,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const PokemonCard = ({ pokemon }) => {
  const {
    trainer: { id: trainerId },
  } = useUserStore();
  const { info, nickname } = pokemon;
  const { id: number, name } = JSON.parse(info);

  return (
    <HStack
      gap="0"
      h="full"
      overflow="hidden"
      border="1px solid rgba(0, 0, 0, 0.12)"
      borderRadius="lg"
      bg="white"
    >
      <VStack
        padding="16px 16px"
        title="Aqui vai ter um 'tooltip' com as estatísticas desse pokémon"
        justifyContent="space-between"
        h="full"
      >
        <Text fontWeight="bold" textAlign="left" w="full">{`#${number}`}</Text>
        <Image
          alt="Pokémon"
          width={60}
          height={60}
          src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${number}.png`}
        />
        <Text>{nickname || name}</Text>
        {nickname && <Text>{name}</Text>}
        {trainerId === pokemon.trainerId && (
          <Text
            fontSize="xs"
            color="gray.500"
            
          >{`Pertence a ${pokemon.trainerId}`}</Text>
        )}
      </VStack>

      {trainerId !== pokemon.trainerId && (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Adicionar à equipe"
            icon={<FontAwesomeIcon icon={faPlus} />}
            bg="#62D98B"
            color="white"
            borderRadius="none"
            height="100%"
            _hover={{ bg: "#4fc17b" }}
            size="xs"
          />
          <Portal>
            <MenuList>
              <MenuItem>Adicionar à Equipe 1</MenuItem>
              <MenuItem>Adicionar à Equipe 2</MenuItem>
              <MenuItem>Criar nova equipe...</MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      )}
    </HStack>
  );
};

export default PokemonCard;
