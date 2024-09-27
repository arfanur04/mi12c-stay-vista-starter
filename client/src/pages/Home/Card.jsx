import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Card = ({ room }) => {
	return (
		<Link
			to={`/room/${room?._id}`}
			className="col-span-1 cursor-pointer group"
		>
			<div className="flex flex-col w-full gap-2">
				<div className="relative w-full overflow-hidden aspect-square rounded-xl">
					<img
						src={room?.image}
						alt="room"
						className="object-cover w-full h-full transition group-hover:scale-150"
					/>
					<div className="absolute top-3 right-3"></div>
				</div>
				<div className="text-lg font-semibold">{room?.location}</div>
				<div className="font-light text-neutral-500">5 nights .</div>
				<div className="flex flex-row items-center gap-1">
					<div className="font-semibold">$ {room?.price}</div>
					<div className="font-light">night</div>
				</div>
			</div>
		</Link>
	);
};

export default Card;

Card.propTypes = {
	room: PropTypes.object,
};
