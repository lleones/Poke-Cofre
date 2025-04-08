import useUserStore from "@/hooks/useUserStore";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const fetchTrainers = async (token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTNAME}/treinadores`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar treinadores");
  }

  return await response.json();
};

const editTrainer = async (id: string, nome: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTNAME}/treinadores/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome }),
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao editar treinador");
  }

  return await response.json();
};

const deleteTrainer = async (id: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTNAME}/treinadores/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao deletar treinador");
  }


  if (response.status === 204) return null;

  return await response.json();
};

export const useEditTrainer = () => {
  const toast = useToast();
  const { token, trainer, setTrainer } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, nome }: { id: string; nome: string }) =>
      editTrainer(id, nome, token),
    onSuccess: (data) => {
      toast({
        title: "Cadastro atualizado.",
        description: "O nome do usuário foi atualizado.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      if (trainer.id === data.id) setTrainer(data);
      queryClient.invalidateQueries({ queryKey: ["trainers"] }); // se tiver lista de treinadores
      queryClient.invalidateQueries({ queryKey: ["pokemons"] }); // se quiser refazer esse fetch
    },
  });
};

export const useDeleteTrainer = () => {
  const { token, setToken } = useUserStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (id: string) => deleteTrainer(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trainers"] }); // se houver lista de treinadores
      queryClient.invalidateQueries({ queryKey: ["pokemons"] }); // se quiser atualizar os pokémons também
      setToken("");
      router.push("/login");
    },
  });
};

export const useTrainers = () => {
  const { token } = useUserStore();

  return useQuery({
    queryKey: ["trainers"],
    queryFn: () => fetchTrainers(token),
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
