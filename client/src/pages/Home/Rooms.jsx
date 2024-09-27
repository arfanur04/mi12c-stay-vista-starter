import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Container from "../../components/Shared/Container";
import Card from "./Card";
import Heading from "../../components/Shared/Heading";

const Rooms = () => {
	const axiosSecure = useAxiosSecure();

	const { data: rooms = [], isLoading } = useQuery({
		queryKey: ["rooms"],
		queryFn: async () => {
			const { data } = await axiosSecure.get("/rooms");
			return data;
		},
	});
	// console.log(`rooms:`, rooms);
	if (isLoading) return <LoadingSpinner />;

	return (
		<Container>
			{rooms && rooms.length > 0 ? (
				<div className="grid grid-cols-1 gap-8 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
					{rooms.map((room) => (
						<Card
							key={room._id}
							room={room}
						/>
					))}
				</div>
			) : (
				<div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
					<Heading
						center={true}
						title="No Rooms Available In This Category!"
						subtitle="Please Select Other Categories."
					/>
				</div>
			)}
		</Container>
	);
};

export default Rooms;
