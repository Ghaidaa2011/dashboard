import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Home from "./pages/website/home/Home";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import About from "./pages/website/about/About";
import PersistLogin from "./auth/PersistLogin";
import RequireAuth from "./auth/RequireAuth";
import Users from "./components/dashboard/users/Users";
import UpdateUser from "./components/dashboard/users/UpdateUser";
import CreateUser from "./components/dashboard/users/CreateUser";
import Dashboard from "./pages/dashboard/Dashboard";
import Products from "./components/dashboard/products/Products";
import UpdateProduct from "./components/dashboard/products/UpdateProduct";
import CreateProduct from "./components/dashboard/products/CreateProduct";
function App() {
  const router = new createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route exact path="users" element={<Users />} />
              <Route path="users/:idUser" element={<UpdateUser />} />
              <Route path="user/create" element={<CreateUser />} />

              <Route exact path="products" element={<Products />} />
              <Route path="products/:idProduct" element={<UpdateProduct />} />
              <Route path="products/create" element={<CreateProduct />} />
            </Route>
          </Route>
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}
export default App;
