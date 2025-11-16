import "./App.css";
import { createBrowserRouter,RouterProvider } from "react-router";
import HomePage from "./pages/HomePage";
import Layout from "./components/layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // { path: "women", element: <WomenPage /> },
      // { path: "sneakers", element: <SneakersPage /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
