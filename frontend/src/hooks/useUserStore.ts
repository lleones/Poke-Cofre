import { create } from "zustand";
import Cookies from "js-cookie";

interface UserStore {
  token: string;
  setToken: (token: string) => void;

  trainer: { id: string; nome: string };
  setTrainer: (trainer: { id: string; nome: string }) => void;
}

const useUserStore = create<UserStore>((set) => ({
  token: Cookies.get("token") || "",
  setToken: (token: string) => {
    Cookies.set("token", token, { expires: 7 });
    set({ token });
  },

  trainer: JSON.parse(Cookies.get("trainer") || "{}"),
  setTrainer: (trainer: { id: string; nome: string }) => {
    Cookies.set("trainer", JSON.stringify(trainer), { expires: 7 });
    set({ trainer });
  },
}));

export default useUserStore;
