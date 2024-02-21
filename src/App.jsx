import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducers/userReducers";
import { getUser } from "./redux/api/userApi";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProductsAll from "./pages/ProductsAll";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Products = lazy(() => import("./pages/Products"));
const OneProduct = lazy(() => import("./pages/OneProduct"));
const SellProduct = lazy(() => import("./pages/SellProduct"));
const YourAdds = lazy(() => import("./pages/YourAdds"));
const YourWishList = lazy(() => import("./pages/YourWishList"));
const EditProduct = lazy(() => import("./pages/EditProduct"));
const Profile = lazy(() => import("./pages/Profile"));

const App = () => {
	const dispatch = useDispatch();
	const { user, loading } = useSelector((state) => state.userReducer);
	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				const data = await getUser(user.uid);
				dispatch(userExist(data.data));
			} else {
				dispatch(userNotExist());
			}
		});
	}, []);

	return loading ? (
		<Loader />
	) : (
		<BrowserRouter>
			<Suspense fallback={<Loader />}>
				<Routes>
					<Route
						path="/login"
						element={
							<ProtectedRoutes isAuthenticated={user ? false : true} redirect="/">
								<Login />
							</ProtectedRoutes>
						}
					/>

					<Route
						element={
							<ProtectedRoutes isAuthenticated={user ? true : false} redirect="/login" />
						}
					>
						<Route path="/" element={<Home />} />
						<Route path="/products/:id" element={<Products />} />
						<Route path="/products-all" element={<ProductsAll />} />
						<Route path="/product/:id" element={<OneProduct />} />
						<Route path="/sell/product" element={<SellProduct />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/profile/adds" element={<YourAdds />} />
						<Route path="/profile/wishlist" element={<YourWishList />} />
						<Route path="/edit/product/:id" element={<EditProduct />} />
					</Route>
				</Routes>
			</Suspense>
			<Toaster position="top-right" />
		</BrowserRouter>
	);
};

export default App;
