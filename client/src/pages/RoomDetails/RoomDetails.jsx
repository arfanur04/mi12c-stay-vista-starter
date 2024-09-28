import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { useParams } from "react-router-dom";
import Container from "../../components/Shared/Container";
import { Helmet } from "react-helmet-async";
import Heading from "../../components/Shared/Heading";
import RoomReservation from "../../components/RoomDetails/RoomReservation";
import { axiosCommon } from "../../hooks/useAxiosCommon";

const RoomDetails = () => {
	const { id } = useParams();

	const { data: room = {}, isLoading } = useQuery({
		queryKey: ["room", id],
		queryFn: async () => {
			const { data } = await axiosCommon.get(`/room/${id}`);
			return data;
		},
	});
	// console.log(`room:`, room);
	if (isLoading) return <LoadingSpinner />;

	return (
		<Container>
			<Helmet>
				<title>{room?.title}</title>
			</Helmet>
			{room && (
				<div className="max-w-screen-lg mx-auto">
					{/* header */}
					<div className="flex flex-col gap-6">
						<div>
							<Heading
								title={room.title}
								subtitle={room.location}
							/>
							<div className="w-full md:h-[60vh] overflow-hidden rounded-xl">
								<img
									className="object-cover w-full "
									src={room.image}
									alt="header image"
								/>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 mt-6 md:grid-cols-7 md:gap-10">
						{/* room info */}
						<div className="flex flex-col col-span-4 gap-8">
							<div className="flex flex-col gap-2">
								<div className="flex flex-col items-center gap-2 text-xl font-semibold">
									<div>Hosted by {room?.host?.name}</div>
									<img
										className="w-8 h-8 rounded-full"
										src={room?.host?.image}
										alt="Avatar"
									/>
								</div>
								<div>
									<div>{room?.guests} guests</div>
									<div>{room?.bedrooms} rooms</div>
									<div>{room?.bathrooms} bathrooms</div>
								</div>
							</div>

							<hr />
							<div>{room?.description}</div>
							<hr />
						</div>

						<div className="order-first mb-10 md:col-span-3 md:order-last">
							<RoomReservation room={room} />
						</div>
					</div>
				</div>
			)}
		</Container>
	);
};

export default RoomDetails;
