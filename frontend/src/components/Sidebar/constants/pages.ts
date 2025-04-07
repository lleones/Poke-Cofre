import {
  faClockRotateLeft,
  faGamepad,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const PAGES = [
  {
    title: "Treinadores",
    path: "/trainers",
    icon: faUsers,
    isHide: (trainerId: string) =>
      trainerId !== "0c3ca399-c58f-4e4c-adde-e11d5ef667bc",
  },
  { title: "Pokémons", path: "/pokemons", icon: faGamepad },
  { title: "Histórico de Batalhas", path: "/battles", icon: faClockRotateLeft },
];

export default PAGES;
