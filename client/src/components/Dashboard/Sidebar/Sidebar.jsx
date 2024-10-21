import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Link, NavLink } from "react-router-dom";
import { BsFillHouseAddFill, BsGraphUp } from "react-icons/bs";
import { MdHomeWork } from "react-icons/md";
import { FcSettings } from "react-icons/fc";
import { IoLogOut } from "react-icons/io5";
import { AiOutlineBars } from "react-icons/ai";

const Sidebar = () => {
	const { logOut } = useAuth();
	const [isActive, setActive] = useState(true);

	const handleToggle = () => {
		setActive(!isActive);
	};

	return (
		<>
			{/* small screen navbar */}
			<header className="flex justify-between text-gray-800 bg-gray-100 md:hidden">
				<section>
					<picture className="block p-4 font-bold cursor-pointer">
						<Link to={"/"}>
							<img
								src="https://i.ibb.co/4ZXzmq5/logo.png"
								alt="logo"
								width={100}
								height={100}
							/>
						</Link>
					</picture>
				</section>

				<button
					onClick={handleToggle}
					className="p-4 focus:outline-none focus:bg-gray-200"
				>
					<AiOutlineBars className="w-5 h-5" />
				</button>
			</header>

			{/* sidebar  */}
			<aside
				className={`absolute inset-y-0 left-0 z-10 flex flex-col items-center justify-between w-64 px-2 py-4 space-y-6 overflow-x-hidden transition duration-200 ease-in-out transform bg-gray-100 md:fixed md:translate-x-0 ${
					isActive && "-translate-x-full"
				}`}
			>
				<section>
					{/* logo */}
					<header>
						<picture className="items-center justify-center hidden w-full px-4 py-2 mx-auto border border-red-500 rounded-lg shadow-lg md:flex bg-rose-100">
							<Link to={"/"}>
								<img
									width={100}
									height={100}
									src="https://i.ibb.co/4ZXzmq5/logo.png"
									alt="logo"
								/>
							</Link>
						</picture>
					</header>

					{/* nav Items */}
					<main>
						{/* conditional toggle button here.. */}

						{/* Menu Items */}
						<nav>
							{/* statistics */}
							<NavLink
								to={"statistics"}
								className={({ isActive }) =>
									`flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
										isActive ? "bg-gray-300 text-gray-700" : "text-gray-600"
									}`
								}
							>
								<BsGraphUp className="w-5 h-5" />
								<span className="mx-4 font-medium">Statistics</span>
							</NavLink>

							{/* add-room */}
							<NavLink
								to={"add-room"}
								className={({ isActive }) =>
									`flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
										isActive ? "bg-gray-300 text-gray-700" : "text-gray-600"
									}`
								}
							>
								<BsFillHouseAddFill className="w-5 h-5" />
								<span className="mx-4 font-medium">Add Room</span>
							</NavLink>

							{/* my-listings */}
							<NavLink
								to={"my-listings"}
								className={({ isActive }) =>
									`flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
										isActive ? "bg-gray-300 text-gray-700" : "text-gray-600"
									}`
								}
							>
								<MdHomeWork className="w-5 h-5" />
								<span className="mx-4 font-medium">My Listings</span>
							</NavLink>
						</nav>
					</main>
				</section>

				<section>
					<hr />

					{/* profile menu */}
					<NavLink
						to={"profile"}
						className={({ isActive }) =>
							`flex items-center w-full px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform ${
								isActive ? "bg-gray-300 text-gray-700" : "text-gray-600"
							}`
						}
					>
						<FcSettings className="w-5 h-5" />
						<span className="mx-4 font-medium">Profile</span>
					</NavLink>

					<button
						onClick={logOut}
						className="flex items-center w-full px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700"
					>
						<IoLogOut className="w-5 h-5" />
						<span className="mx-4 font-medium">Logout</span>
					</button>
				</section>
			</aside>
		</>
	);
};

export default Sidebar;
