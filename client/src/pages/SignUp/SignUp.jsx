import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import {
	errorAlert,
	loadingState,
	successAlert,
} from "../../functions/functions";
import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";

const SignUp = () => {
	const {
		createUser,
		updateUserProfile,
		signInWithGoogle,
		loading,
		setLoading,
	} = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = e.target;
		const name = form.name.value;
		const email = form.email.value;
		const password = form.password.value;
		const image = form.image.files[0];

		const formData = new FormData();
		formData.append("image", image);

		try {
			loadingState();
			setLoading(true);
			//: 1. upload image to imgBB and get image url
			const { data } = await axios.post(
				`https://api.imgbb.com/1/upload?key=${
					import.meta.env.VITE_Image_api_key
				}`,
				formData
			);
			console.log("1_imgBB", data.data.display_url);

			//: 2. create user
			await createUser(email, password);
			console.log(`2_firebase User created Successfully`);

			//: 3. update user profile
			await updateUserProfile(name, data.data.display_url);
			console.log("3_user updated Successfully");

			// Swal.close();
			navigate("/");
			successAlert("Sign Up Successfully");
		} catch (error) {
			console.log("error: ", error);
			errorAlert(error);
			setLoading(false);
		}
	};

	// handle google sign in
	const handleGoogleSignIn = async () => {
		try {
			loadingState();
			await signInWithGoogle();
			navigate("/");
			successAlert("LogIn Successful");
		} catch (error) {
			console.log("error: ", error);
			errorAlert(error);
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="flex flex-col max-w-md p-6 text-gray-900 bg-gray-100 rounded-md sm:p-10">
				<div className="mb-8 text-center">
					<h1 className="my-3 text-4xl font-bold">Sign Up</h1>
					<p className="text-sm text-gray-400">Welcome to StayVista</p>
				</div>
				<form
					onSubmit={handleSubmit}
					className="space-y-6"
				>
					<div className="space-y-4">
						<div>
							<label
								htmlFor="email"
								className="block mb-2 text-sm"
							>
								Name
							</label>
							<input
								type="text"
								name="name"
								required
								id="name"
								placeholder="Enter Your Name Here"
								className="w-full px-3 py-2 text-gray-900 bg-gray-200 border border-gray-300 rounded-md focus:outline-rose-500"
								data-temp-mail-org="0"
							/>
						</div>
						<div>
							<label
								htmlFor="image"
								className="block mb-2 text-sm"
							>
								Select Image:
							</label>
							<input
								name="image"
								type="file"
								required
								id="image"
								accept="image/*"
							/>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block mb-2 text-sm"
							>
								Email address
							</label>
							<input
								name="email"
								type="email"
								required
								id="email"
								placeholder="Enter Your Email Here"
								className="w-full px-3 py-2 text-gray-900 bg-gray-200 border border-gray-300 rounded-md focus:outline-rose-500"
								data-temp-mail-org="0"
							/>
						</div>
						<div>
							<div className="flex justify-between">
								<label
									htmlFor="password"
									className="mb-2 text-sm"
								>
									Password
								</label>
							</div>
							<input
								name="password"
								type="password"
								required
								id="password"
								autoComplete="new-password"
								placeholder="*******"
								className="w-full px-3 py-2 text-gray-900 bg-gray-200 border border-gray-300 rounded-md focus:outline-rose-500"
							/>
						</div>
					</div>
					<div>
						<button
							type="submit"
							disabled={loading}
							className="w-full py-3 text-white rounded-md bg-rose-500 disabled:cursor-not-allowed"
						>
							{/* Continue */}
							{loading ? (
								<TbFidgetSpinner className="mx-auto animate-spin" />
							) : (
								"Continue"
							)}
						</button>
					</div>
				</form>
				<div className="flex items-center pt-4 space-x-1">
					<div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
					<p className="px-3 text-sm dark:text-gray-400">
						Signup with social accounts
					</p>
					<div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
				</div>
				<button
					onClick={handleGoogleSignIn}
					disabled={loading}
					className="flex items-center justify-center p-2 m-3 space-x-2 border border-gray-300 disabled:cursor-not-allowed border-rounded"
				>
					<FcGoogle size={32} />
					<p>Continue with Google</p>
				</button>
				<p className="px-6 text-sm text-center text-gray-400">
					Already have an account?{" "}
					<Link
						to="/login"
						className="text-gray-600 hover:underline hover:text-rose-500"
					>
						Login
					</Link>
					.
				</p>
			</div>
		</div>
	);
};
export default SignUp;
