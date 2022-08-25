import { AiOutlineSearch } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { BsChatDots } from "react-icons/bs";

const menuItems = [
  {
    name: "search",
    path: "/",
    Icon: AiOutlineSearch,
  },
  {
    name: "sell",
    path: "/sell",
    Icon: IoAddCircleOutline,
  },
  {
    name: "chats",
    path: "/chats",
    Icon: BsChatDots,
  },
  {
    name: "profile",
    path: "/profile/products",
    Icon: IoPersonOutline,
  },
];

export default menuItems;
