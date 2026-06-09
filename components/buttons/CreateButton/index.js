import { scrollToTop } from "@/components/Global";
import { StyledCreateButton } from "./CreateButton.styled";
export default function CreateButton({
    navbarLocation,
    isCreateActivityMode,
    setIsCreateActivityMode,
    setActivityFormStatus,
}) {
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
