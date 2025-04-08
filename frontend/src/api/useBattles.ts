import useUserStore from "@/hooks/useUserStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchBattles = async (token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/batalhas`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar batalhas");
  }

  const battles = await response.json();

  return battles;
};

export const useBattles = () => {
  const { token } = useUserStore();

  return useQuery({
    queryKey: ["battles"],
    queryFn: () => fetchBattles(token),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};

const deleteBattle = async (id: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTNAME}/batalhas/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao deletar batalha");
  }

  if (response.status === 204) return null;

  return await response.json();
};

export const useDeleteBattle = () => {
  const { token } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBattle(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["battles"] });
    },
    onError: (err) => {
      console.error("❌ Erro ao deletar batalha:", err);
    },
  });
};
