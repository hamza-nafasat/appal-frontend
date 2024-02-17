import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import YourAdds from "./pages/YourAdds";
import YourWishList from "./pages/YourWishList";
import EditProduct from "./pages/EditProduct";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Products = lazy(() => import("./pages/Products"));
const OneProduct = lazy(() => import("./pages/OneProduct"));
const SellProduct = lazy(() => import("./pages/SellProduct"));

const App = () => {
	return (
		<BrowserRouter>
			<Suspense>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/products/:id" element={<Products />} />
					<Route path="/product/:id" element={<OneProduct />} />
					<Route path="/sell/product" element={<SellProduct />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/profile/adds" element={<YourAdds />} />
					<Route path="/profile/wishlist" element={<YourWishList />} />
					<Route path="/edit/product" element={<EditProduct />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default App;
