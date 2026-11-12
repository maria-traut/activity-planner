import toast from "react-hot-toast";

import { StyledToast } from "./Toast.styled";

export default function showToast(message: string, variant: "success" | "danger" = "success") {
	toast.custom(<StyledToast $color={variant}>{message} </StyledToast>);
}
