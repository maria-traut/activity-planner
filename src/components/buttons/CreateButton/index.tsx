import type { Dispatch, SetStateAction } from "react";

import { scrollToTop } from "@/components/Global";
import type { ActivityFormStatus } from "@/types";

import { StyledCreateButton } from "./CreateButton.styled";

interface Props {
	navbarLocation: string;
	isCreateActivityMode: boolean;
	setIsCreateActivityMode: Dispatch<SetStateAction<boolean>>;
	setActivityFormStatus: Dispatch<SetStateAction<ActivityFormStatus>>;
}

export default function CreateButton({
	navbarLocation,
	isCreateActivityMode,
	setIsCreateActivityMode,
	setActivityFormStatus,
}: Props) {
	return (
		<>
			{navbarLocation === "/" && !isCreateActivityMode && (
				<StyledCreateButton
					onClick={() => {
						setIsCreateActivityMode(!isCreateActivityMode);
						setActivityFormStatus({
							type: "",
							message: "",
						});
						scrollToTop();
					}}
				>
					➕
				</StyledCreateButton>
			)}
		</>
	);
}
