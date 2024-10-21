import { Link, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import {
	errorAlert,
	loadingState,
	successAlert,
} from "../../functions/functions";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { TbFidgetSpinner } from "react-icons/tb";
import { Helmet } from "react-helmet-async";
import { websiteTitle } from "../../layouts/Main";

const Login = () => {
	// const [email, setEmail] = useState("");
	const { loading, setLoading, signIn, signInWithGoogle, resetPassword } =
		useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location?.state || "/";

	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = e.target;
		const email = form.email.value;
		const password = form.password.value;

		try {
			loadingState();
			setLoading(true);

			//: 1. sign in user
			await signIn(email, password);
			console.log(`2_firebase User login Successful`);

			navigate(from);
			successAlert("login Successful");
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
			navigate(from);
			successAlert("LogIn Successful");
		} catch (error) {
			console.log("error: ", error);
			errorAlert(error);
			setLoading(false);
		}
	};

	const handleResetPassword = async () => {
		try {
			// if (!email) return errorAlert("Please enter your email first");
			// console.log(`email:`, email);

			const { value: email } = await Swal.fire({
				title: "Reset Password",
				input: "email",
				inputLabel: "Your email address",
				inputPlaceholder: "Enter your email address",
				confirmButtonText: "Submit",
				showCancelButton: true,
			});
			if (email) {
				loadingState();
				await resetPassword(email);
				successAlert(`Password reset email sent to ${email}`, false);
				setLoading(false);
			}
		} catch (error) {
			console.log("error: ", error);
			errorAlert(error);
			setLoading(false);
		}
	};

	return (
		<>
			<Helmet>
				<title>{websiteTitle} - Log In</title>
			</Helmet>
			<div className="flex items-center justify-center min-h-screen">
				<div className="flex flex-col max-w-md p-6 text-gray-900 bg-gray-100 rounded-md sm:p-10">
					<div className="mb-8 text-center">
						<h1 className="my-3 text-4xl font-bold">Log In</h1>
						<p className="text-sm text-gray-400">
							Sign in to access your account
						</p>
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
									Email address
								</label>
								<input
									type="email"
									name="email"
									// onBlur={(e) => setEmail(e.target.value)}
									id="email"
									required
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
									type="password"
									name="password"
									autoComplete="current-password"
									id="password"
									required
									placeholder="*******"
									className="w-full px-3 py-2 text-gray-900 bg-gray-200 border border-gray-300 rounded-md focus:outline-rose-500"
								/>
							</div>
						</div>

						<div>
							<button
								disabled={loading}
								type="submit"
								className="w-full py-3 text-white rounded-md disabled:cursor-not-allowed bg-rose-500"
							>
								{loading ? (
									<TbFidgetSpinner className="mx-auto animate-spin" />
								) : (
									"Log In"
								)}
							</button>
						</div>
					</form>
					<div className="space-y-1">
						<button
							onClick={handleResetPassword}
							className="text-xs text-gray-400 hover:underline hover:text-rose-500"
						>
							Forgot password?
						</button>
					</div>
					<div className="flex items-center pt-4 space-x-1">
						<div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
						<p className="px-3 text-sm dark:text-gray-400">
							Login with social accounts
						</p>
						<div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
					</div>
					<button
						disabled={loading}
						onClick={handleGoogleSignIn}
						className="flex items-center justify-center p-2 m-3 space-x-2 border border-gray-300 cursor-pointer border-rounded disabled:cursor-not-allowed"
					>
						<FcGoogle size={32} />

						<p>Continue with Google</p>
					</button>
					<p className="px-6 text-sm text-center text-gray-400">
						Don&apos;t have an account yet?{" "}
						<Link
							to="/signup"
							className="text-gray-600 hover:underline hover:text-rose-500"
						>
							Sign up
						</Link>
						.
					</p>
				</div>
			</div>
		</>
	);
};

export default Login;
