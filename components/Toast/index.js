import { StyledToast } from "./Toast.styled";
import toast from "react-hot-toast";

export default function showToast(message, variant = "success") {
    toast.custom(<StyledToast $color={variant}>{message} </StyledToast>);
}
