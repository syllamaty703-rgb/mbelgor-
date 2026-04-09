import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/pages/Home";
import { Collection } from "./components/pages/Collection";
import { ProductDetail } from "./components/pages/ProductDetail";
import { About } from "./components/pages/About";
import { Gallery } from "./components/pages/Gallery";
import { Contact } from "./components/pages/Contact";
import { Login } from "./components/pages/Login";
import { NotFound } from "./components/pages/NotFound";
import { AdminPage } from "./components/pages/AdminPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "collection", Component: Collection },
      { path: "product/:id", Component: ProductDetail },
      { path: "about", Component: About },
      { path: "gallery", Component: Gallery },
      { path: "contact", Component: Contact },
      { path: "login", Component: Login },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/admin",
    Component: AdminPage,
  },
]);
