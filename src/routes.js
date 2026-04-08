import Home from "./pages/home/Home";
import Delivery from "./pages/delivery/Delivery";
import Order from "./pages/order/Order";
import Reserved from "./pages/reserved/Reserved";

export const routes = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "home",
    element: <Home />
  },
  {
    path: "delivery",
    element: <Delivery />
  },
  {
    path: "/order",
    element: <Order />
  },
  {
    path: "reserved",
    element: <Reserved />
  }
];