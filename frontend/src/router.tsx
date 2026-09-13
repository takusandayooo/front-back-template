import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { HomePage, UserPage } from "./App";

const rootRoute = createRootRoute({
  component: Outlet,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/users/$userId",
  component: UserPage,
});

const routeTree = rootRoute.addChildren([indexRoute, userRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
