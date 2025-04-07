"use client";

import {
  Box,
  Button,
  Circle,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import useUserStore from "@/hooks/useUserStore";
import { useEffect, useState } from "react";
import CustomModal from "@/components/CustomModal/CustomModal";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useDeleteTrainer,
  useEditTrainer,
  useTrainers,
} from "@/api/useTrainers";

type Inputs = {
  nome: string;
  id: string;
};

const Trainers = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTrainer, setSelectedTrainer] = useState<any>(null);

  const { register, handleSubmit, setValue } = useForm<Inputs>();

  useEffect(() => {
    setValue("id", selectedTrainer?.id);
    setValue("nome", selectedTrainer?.nome);
  }, [selectedTrainer]);

  const {
    data: trainers,
  }: { data: { nome: string; id: string }[] | undefined } = useTrainers();
  const { mutate: editTrainer } = useEditTrainer();
  const { mutate: deleteTrainer } = useDeleteTrainer();

  const onDeleteTrainer = (id: string) => {
    deleteTrainer(id);
  };

  const onEditTrainer: SubmitHandler<Inputs> = (body) => {
    editTrainer(body);
  };

  return (
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
        Treinadores
      </Heading>
      <CustomModal
        confirmText="Renomear"
        isOpen={isOpen}
        onClose={onClose}
        title="Renomear Treinador"
        onSubmit={handleSubmit(onEditTrainer)}
      >
        <Input {...register("nome")} />
      </CustomModal>
      <VStack maxW="600px" margin="auto" paddingBottom="48px">
        {trainers?.map(({ nome, id }, index) => (
          <HStack
            key={index}
            w="full"
            bg="white"
            color="black"
            padding="16px"
            borderRadius="xl"
            border="1px solid"
            borderColor="borderColor"
            gap={4}
          >
            <Circle size="40px" bgColor="#a4a4a4" color="white" fontSize="lg">
              <FontAwesomeIcon icon={faUser} />
            </Circle>
            <VStack align="left" gap="0">
              <Text fontSize="xl">{nome}</Text>
              <Text fontSize="sm" fontStyle="italic">
                {id}
              </Text>
            </VStack>
            <Flex marginLeft="auto" gap={2}>
              <Button
                colorScheme="teal"
                backgroundColor="color4"
                color="white"
                size="xs"
                onClick={() => {
                  setSelectedTrainer({ nome, id });
                  onOpen();
                }}
              >
                <FontAwesomeIcon icon={faPen} />
              </Button>
              <Button
                colorScheme="teal"
                backgroundColor="color1"
                color="white"
                size="xs"
                onClick={() => onDeleteTrainer(id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Flex>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Trainers;
