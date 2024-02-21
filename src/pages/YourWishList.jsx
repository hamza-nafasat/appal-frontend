import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import ProfileHeader from "../components/profileHeader";
import { OneAdd } from "./YourAdds";
import { useGetWishListQuery } from "../redux/api/productsApi";
import Loader from "../components/Loader";
import { SingleProduct } from "../components/FeaturedCard";
const YourWishList = () => {
	const { user } = useSelector((state) => state.userReducer);
	const { data, isLoading, isError, refetch } = useGetWishListQuery({ wishlists: user?.wishList });
	useEffect(() => {
		refetch();
	}, []);
	return isLoading ? (
		<Loader />
	) : (
		<div className="yourAddsPage">
			<Header />
			<main>
				<ProfileHeader />
				<article className="allAdds">
					{data?.data?.map((wish) => (
						<SingleProduct product={wish} />
					))}
				</article>
			</main>
		</div>
	);
};

export default YourWishList;
