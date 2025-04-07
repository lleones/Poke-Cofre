import { usePokemon } from "@/api/usePokemons";
import { Circle } from "@chakra-ui/react";
import Image from "next/image";

interface PokemonPartyProps {
  pokemonId: string;
  src: string;
}

const PokemonParty = ({ pokemonId, src }: PokemonPartyProps) => {
  const { data: pokemon = {} } = usePokemon(pokemonId);
  const { info } = pokemon;

  return (
    <Circle bg="white" size="40px" border="1px solid" borderColor="borderColor">
      {info?.id && (
        <Image
          src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${String(
            info?.id
          ).padStart(3, "0")}.png`}
          height={30}
          width={30}
          alt="Pokémon"
        />
      )}
    </Circle>
  );
};

export default PokemonParty;
