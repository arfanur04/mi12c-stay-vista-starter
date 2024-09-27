import axios from "axios";
import { apiUrl } from "../layouts/Main";

export const axiosCommon = axios.create({
	baseURL: `${apiUrl}`,
});

const useAxiosCommon = () => {
	return axiosCommon;
};

export default useAxiosCommon;
