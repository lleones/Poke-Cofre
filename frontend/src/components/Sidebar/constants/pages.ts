import {
  faClockRotateLeft,
  faGamepad,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const PAGES = [
  { title: "Treinadores", path: "/trainers", icon: faUsers },
  { title: "Pokémons", path: "/pokemons", icon: faGamepad },
  { title: "Histórico de Batalhas", path: "/battles", icon: faClockRotateLeft },
];

export default PAGES;
