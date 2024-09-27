import { Helmet } from "react-helmet-async";
import { websiteTitle } from "../../layouts/Main";
import Categories from "./Categories";
import Rooms from "./Rooms";

const Home = () => {
	return (
		<>
			<Helmet>
				<title>{websiteTitle} | Vacation Homes & Condo Rentals </title>
			</Helmet>
			<div>
				{/* Categories section */}
				<Categories />
				{/* Room Section */}
				<Rooms />
			</div>
		</>
	);
};

export default Home;
