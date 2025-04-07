import useUserStore from "@/hooks/useUserStore";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

type CreatePartyInputs = {
  trainerId: string;
  pokemons: [string];
};

type PartiesInputs = {
  id: any;
  trainerId: string;
  pokemons: [string];
};

const fetchParties = async (token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/parties`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar parties");
  }

  const parties = await response.json();

  const parsed = parties.map((party: any) => ({
    ...party,
    pokemons:
      typeof party.pokemons === "string"
        ? JSON.parse(party.pokemons)
        : party.pokemons,
  }));

  // Reorganiza para que a party do usuário logado venha primeiro
  const {
    trainer: { id: trainerId },
  } = useUserStore.getState();

  const ordered = parsed.sort((a: any, b: any) => {
    if (a.trainerId === trainerId) return -1;
    if (b.trainerId === trainerId) return 1;
    return 0;
  });

  return ordered;
};

const createParty = async (body: CreatePartyInputs, token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/parties`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar party");
  }

  return await response.json();
};

const editParty = async (body: PartiesInputs, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTNAME}/parties/${body?.id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao criar party");
  }

  return await response.json();
};

const deleteParty = async (id: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTNAME}/parties/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao deletar party");
  }

  return await response.json();
};

export const useParties = () => {
  const { token } = useUserStore();
  return useQuery({
    queryKey: ["parties"],
    queryFn: () => fetchParties(token),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateParty = () => {
  const { token } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreatePartyInputs) => createParty(body, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parties"] });
    },
  });
};

export const useEditParty = () => {
  const { token } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: PartiesInputs) => editParty(body, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parties"] });
    },
  });
};

export const useDeleteParty = () => {
  const { token } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteParty(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parties"] });
    },
  });
};
