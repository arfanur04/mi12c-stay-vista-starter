import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import { Helmet } from "react-helmet-async";
import { websiteTitle } from "./Main";

const DashboardLayout = () => {
	return (
		<>
			<Helmet>
				<title>{websiteTitle} - Dashboard</title>
			</Helmet>
			<div className="relative min-h-svh md:flex">
				{/* sidebar */}
				<Sidebar />

				{/* outlet dynamic content */}
				<div className="flex-1 md:ml-64">
					<div className="p-5">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
};

export default DashboardLayout;
