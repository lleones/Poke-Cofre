import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@/hooks/useUserStore";

type CatchPokemonInputs = {
  name: string;
  nickname: string;
  trainerId: string;
};

type PokemonInputs = {
  id: string;
  name: string;
  nickname: string;
  trainerId: string;
};

const fetchPokemon = async (id: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTNAME}/pokemons/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar Pokémon");
  }

  const data = await response.json();

  return {
    ...data,
    info: safeParseInfo(data.info),
  };
};

const fetchPokemons = async (token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/pokemons`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!Array.isArray(data)) return [];

  return data.map((pokemon) => ({
    ...pokemon,
    info: safeParseInfo(pokemon.info),
  }));
};

const fetchCatchPokemon = async (body: CatchPokemonInputs, token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/pokemons`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Erro: ao capturar pokémon");
  }

  return await response.json();
};

const fetchEditPokemon = async (body: PokemonInputs, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTNAME}/pokemons/${body?.id}`,
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
    throw new Error("Erro: ao editar pokémon");
  }

  return await response.json();
};

const fetchDeletePokemon = async (id: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTNAME}/pokemons/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro: ao editar pokémon");
  }

  return await response.json();
};

export const usePokemon = (id: string) => {
  const { token } = useUserStore();

  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => fetchPokemon(id, token),
    enabled: !!token && !!id, // só executa se houver token e id
    staleTime: 1000 * 60 * 5,
  });
};

export const usePokemons = () => {
  const { token } = useUserStore();

  return useQuery({
    queryKey: ["pokemons"],
    queryFn: () => fetchPokemons(token),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCatchPokemon = () => {
  const { token } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CatchPokemonInputs) => fetchCatchPokemon(body, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pokemons"] });
    },
  });
};

export const useEditPokemon = () => {
  const { token } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: PokemonInputs) => fetchEditPokemon(body, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pokemons"] });
    },
  });
};

export const useDeletePokemon = () => {
  const { token } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => fetchDeletePokemon(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pokemons"] });
    },
  });
};

// Função de segurança pra evitar erro se info não for JSON válido
const safeParseInfo = (info: string) => {
  try {
    return JSON.parse(info);
  } catch {
    return null;
  }
};
