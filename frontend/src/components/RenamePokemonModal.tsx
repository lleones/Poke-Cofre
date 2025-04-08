import { useEditPokemon } from "@/api/usePokemons";
import CustomModal from "@/components/CustomModal";
import useUserStore from "@/hooks/useUserStore";
import { Input } from "@chakra-ui/react";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ModalProps {
  pokemon: any;
  isOpen: boolean;
  onClose: () => void;
}

type Inputs = {
  nickname: string;
  name: string;
  id: string;
  trainerId: string;
};

const RenamePokemonModal: FC<ModalProps> = ({ pokemon, isOpen, onClose }) => {
  const {
    id,
    nickname,
    info: { name },
  } = pokemon;

  const {
    trainer: { id: trainerId },
  } = useUserStore();

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      trainerId,
      id,
      name,
      nickname: nickname || name,
    },
  });

  const { mutate } = useEditPokemon();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data);
  };

  return (
    <CustomModal
      confirmText="Renomear"
      isOpen={isOpen}
      onClose={onClose}
      title="Renomear pokémon"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input {...register("nickname")} />
    </CustomModal>
  );
};

export default RenamePokemonModal;
