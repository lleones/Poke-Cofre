import { useCreateParty, useEditParty } from "@/api/useParties";
import { usePokemons } from "@/api/usePokemons";
import CustomModal from "@/components/CustomModal";
import useUserStore from "@/hooks/useUserStore";
import { Select, Text, VStack } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface PartyModalProps {
  party: any;
  isOpen: boolean;
  onClose: () => void;
}

type Inputs = {
  trainerId: string;
  pokemons: string[]; // IDs dos pokémons
};

const PartyModal: FC<PartyModalProps> = ({ isOpen, onClose, party = {} }) => {
  const { id, pokemons } = party;
  const {
    trainer: { id: trainerId },
  } = useUserStore();

  const { reset, setValue, watch, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      trainerId: trainerId,
      pokemons: Array(6).fill(""),
    },
  });

  useEffect(() => {
    if (trainerId && pokemons) {
      reset({
        trainerId: trainerId,
        pokemons: pokemons.length ? pokemons : Array(6).fill(""),
      });
    }
  }, [trainerId, pokemons, reset]);

  const { data: allPokemons } = usePokemons();
  const { mutate } = useCreateParty();
  const { mutate: editParty } = useEditParty();

  const myPokemons = allPokemons?.filter(
    (pokemon) => pokemon?.trainerId === trainerId
  );

  const selectedPokemons = watch("pokemons");

  const handleSelectChange = (index: number, value: string) => {
    const updated = [...selectedPokemons];
    updated[index] = value;
    setValue("pokemons", updated);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!id)
      mutate({
        trainerId,
        pokemons: data.pokemons as [string],
      });
    else
      editParty({
        ...party,
        pokemons: data.pokemons as [string],
      });
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={id ? "Editar Equipe" : "Criar Equipe"}
      onSubmit={handleSubmit(onSubmit)}
      confirmText={id ? "Editar" : "Criar"}
    >
      <VStack spacing={4}>
        {[...Array(6)].map((_, index) => {
          const selectedSet = new Set(
            selectedPokemons.filter((_, i) => i !== index)
          );
          return (
            <VStack align="left" w="full" key={index}>
              <Text>Pokémon {index + 1}</Text>
              <Select
                placeholder={`Selecione o Pokémon ${index + 1}`}
                value={selectedPokemons[index] || ""}
                onChange={(e) => handleSelectChange(index, e.target.value)}
              >
                {myPokemons
                  ?.filter((p) => !selectedSet.has(p.id)) // evita pokémons repetidos
                  .map((pokemon) => {
                    const optionText = pokemon.nickname
                      ? `${pokemon.nickname} (${pokemon.info.name})`
                      : pokemon.info.name;
                    return (
                      <option key={pokemon.id} value={pokemon.id}>
                        {optionText}
                      </option>
                    );
                  })}
              </Select>
            </VStack>
          );
        })}
      </VStack>
    </CustomModal>
  );
};

export default PartyModal;
