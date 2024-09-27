import PropTypes from "prop-types";

const Heading = ({ title, subtitle, center }) => {
	return (
		<div className={center ? "text-center" : "text-start"}>
			<div className="text-2xl font-bold">{title}</div>
			<div className="mt-2 font-light text-neutral-500">{subtitle}</div>
		</div>
	);
};

export default Heading;

Heading.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	center: PropTypes.bool,
};
