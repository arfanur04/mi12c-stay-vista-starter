import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";

export const websiteTitle = "StayVista";
// export const apiUrl = `${import.meta.env.VITE_API_URL}`;
export const apiUrl = `http://${window.location.hostname}:5000`;

const Main = () => {
	return (
		<div>
			<Navbar />
			<div className="pt-24 min-h-[calc(100vh-68px)]">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default Main;
