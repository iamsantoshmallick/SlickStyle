import "./App.css";
import { createBrowserRouter,RouterProvider } from "react-router";
import HomePage from "./pages/HomePage";
import Layout from "./components/layout/Layout";
import DynamicHome from "./pages/DynamicHome";
import ProductPage from "./components/product/ProductPage";
import ErrorPage from "./pages/ErrorPage";
import CategoryPage from "./pages/CategoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // Home Page
      {
        index: true,
        element: <HomePage />,
      },
      // Dynamic Home Page (Category Landing)
      {
        path: ":gender", 
        element: <DynamicHome />,
      },
      // Category Listing Page (e.g., /men/t-shirts, /women/dresses)
      {
        path: ":gender/:category",
        element: <CategoryPage />,
      },
      // Product Details Page
      {
        path: "product/:productId",
        element: <ProductPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
