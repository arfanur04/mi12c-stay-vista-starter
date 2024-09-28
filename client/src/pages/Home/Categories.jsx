import Container from "../../components/Shared/Container";
import { categories } from "./CategoriesData";
import CategoryBox from "./CategoryBox";

const Categories = () => {
	return (
		<Container>
			<div className="flex items-center justify-between pt-4 overflow-x-auto">
				{categories.map((item) => (
					<CategoryBox
						key={item.label}
						label={item.label}
						icon={item.icon}
					></CategoryBox>
				))}
			</div>
		</Container>
	);
};

export default Categories;
