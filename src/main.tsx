import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BlogListingPage from "./pages/BlogListingPage.tsx";
import Layout from "./components/Layout.tsx";
import CreateBlogPage from "./pages/CreateBlogPage.js";
import LoginPage from "./pages/LoginPage.tsx";
import StatsPage from "./pages/StatsPage.tsx";
import TrashPage from "./pages/TrashPage.tsx";
import AuthLayout from "./components/AuthLayout.tsx";
import { Provider } from "react-redux";
import { store } from "@/store/store.ts";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute authentication={true}>
            <Layout>
              <BlogListingPage />
            </Layout>
          </ProtectedRoute>
        ),
      },
      {
        path: "/create-blog/:blogId",
        element: <CreateBlogPage />,
      },
      {
        path: "/login",
        element: (
          <ProtectedRoute authentication={false}>
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          </ProtectedRoute>
        ),
      },
     
      {
        path: "/stats",
        element: (
          <Layout>
            <StatsPage />
          </Layout>
        ),
      },
      {
        path: "/trash",
        element: (
          <Layout>
            <TrashPage />
          </Layout>
        ),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
