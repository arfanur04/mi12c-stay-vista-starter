import Swal from "sweetalert2";

export const loadingState = (notAllowedOutsideClick) => {
	Swal.fire({
		background: "rgba(0, 0, 0, 0.0)",
		backdrop: "rgba(0, 0, 0, 0.5)",
		color: "#fff",
		didOpen: () => {
			Swal.showLoading();
		},
		...(notAllowedOutsideClick && {
			allowOutsideClick: false,
			allowEscapeKey: false,
		}),
		// allowOutsideClick: false,
		// allowEscapeKey: false,
	});
};

export const errorAlert = (error) => {
	Swal.fire({
		icon: "error",
		title: `${error?.code || error}`,
		text: `${error?.message || ""}`,
	});
};

export const successAlert = (title, time = true) => {
	Swal.fire({
		position: "top-end",
		icon: "success",
		title: `${title}`,
		showConfirmButton: false,
		...(time && { timer: 1500 }),
	});
};

export const infoAlert = (title, time = true) => {
	Swal.fire({
		position: "top-end",
		icon: "info",
		title: `${title}`,
		showConfirmButton: false,
		...(time && { timer: 1500 }),
	});
};
