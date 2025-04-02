import { Circle } from "@chakra-ui/react";
import Image from "next/image";

interface PokemonPartyProps {
  src: string;
}

const PokemonParty = ({ src }: PokemonPartyProps) => {
  return (
    <Circle bg="#F2F2F2" size="40px">
      <Image src={src} height={30} width={30} alt="Pokémon" />
    </Circle>
  );
};

export default PokemonParty;
