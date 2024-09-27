import axios from "axios";
import { apiUrl } from "../layouts/Main";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";

export const axiosSecure = axios.create({
	baseURL: `${apiUrl}`,
	withCredentials: true,
});

const useAxiosSecure = () => {
	const { logOut } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		axiosSecure.interceptors.response.use(
			(res) => {
				return res;
			},
			async (error) => {
				console.log("error tracked in the interceptors", error);
				if (error.response.status === 401 || error.response.status === 403) {
					await logOut();
					navigate("/login");
				}
				return Promise.reject(error);
			}
		);
	}, [logOut, navigate]);

	return axiosSecure;
};

export default useAxiosSecure;
