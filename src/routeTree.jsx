import { createRootRoute, createRoute, Outlet } from "@tanstack/react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import CarParts from "./components/CarParts";

const rootRoute = createRootRoute({
  component: () => (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const carPartsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/carparts",
  component: CarParts,
});

export const routeTree = rootRoute.addChildren([homeRoute, carPartsRoute]);