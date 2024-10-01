import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";

const MenuDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { user, logOut } = useAuth();
	const dropdownRef = useRef(null);

	// close the dropdown when clicked outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			// check if the clicked is outside the dropdown
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		// add event listener to detect click
		document.addEventListener("mousedown", handleClickOutside);

		// cleanup event listener when component unmounts
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dropdownRef]);

	return (
		<div
			className="relative"
			ref={dropdownRef}
		>
			<div className="flex flex-row items-center gap-3">
				{/* Become A Host btn */}
				<div className="hidden md:block">
					<button className="px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer disabled:cursor-not-allowed hover:bg-neutral-100">
						Host your home
					</button>
				</div>
				{/* Dropdown btn */}
				<div
					onClick={() => setIsOpen(!isOpen)}
					className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
				>
					<AiOutlineMenu />
					<div className="hidden md:block">
						{/* Avatar */}
						<img
							className="rounded-full"
							referrerPolicy="no-referrer"
							src={user && user.photoURL ? user.photoURL : avatarImg}
							alt="profile"
							height="30"
							width="30"
						/>
					</div>
				</div>
			</div>
			{isOpen && (
				<div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
					<div className="flex flex-col cursor-pointer">
						<Link
							to="/"
							className="block px-4 py-3 font-semibold transition md:hidden hover:bg-neutral-100"
						>
							Home
						</Link>

						{user ? (
							<>
								<button
									onClick={() => {
										logOut();
										setIsOpen(false);
									}}
								>
									logOut
								</button>
							</>
						) : (
							<>
								<Link
									to="/login"
									className="px-4 py-3 font-semibold transition hover:bg-neutral-100"
								>
									Login
								</Link>
								<Link
									to="/signup"
									className="px-4 py-3 font-semibold transition hover:bg-neutral-100"
								>
									Sign Up
								</Link>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default MenuDropdown;
