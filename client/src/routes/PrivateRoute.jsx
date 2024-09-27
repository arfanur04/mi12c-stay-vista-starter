import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const PrivateRoute = ({ children }) => {
	const { user, loading } = useAuth();
	const location = useLocation();

	if (loading) {
		return <LoadingSpinner />;
	}

	if (user) {
		return children;
	}

	return (
		<Navigate
			to={"/login"}
			state={location.pathname}
			replace
		/>
	);
};

export default PrivateRoute;

PrivateRoute.propTypes = {
	children: PropTypes.any,
};
