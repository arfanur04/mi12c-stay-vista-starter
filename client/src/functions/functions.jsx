import Swal from "sweetalert2";

export const loadingState = () => {
	Swal.fire({
		background: "rgba(0, 0, 0, 0.0)",
		backdrop: "rgba(0, 0, 0, 0.5)",
		color: "#fff",
		didOpen: () => {
			Swal.showLoading();
		},
	});
};

export const errorAlert = (error) => {
	Swal.fire({
		icon: "error",
		title: `${error?.code}`,
		text: `${error?.message}`,
	});
};

export const successAlert = (title) => {
	Swal.fire({
		position: "top-end",
		icon: "success",
		title: `${title}`,
		showConfirmButton: false,
		timer: 1500,
	});
};

export const infoAlert = (title) => {
	Swal.fire({
		position: "top-end",
		icon: "info",
		title: `${title}`,
		showConfirmButton: false,
		timer: 1500,
	});
};
