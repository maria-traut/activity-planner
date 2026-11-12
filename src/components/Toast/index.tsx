import toast from "react-hot-toast";

import { StyledToast } from "./Toast.styled";

export default function showToast(message, variant = "success") {
	toast.custom(<StyledToast $color={variant}>{message} </StyledToast>);
}
