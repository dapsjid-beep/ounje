
import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Menu from "../pages/menu/page";
import About from "../pages/about/page";
import Checkout from "../pages/checkout/page";
import OrderTracking from "../pages/order-tracking/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/order-tracking/:orderId",
    element: <OrderTracking />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
