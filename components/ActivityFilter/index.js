import {
    StyledFormFieldset,
    StyledFormFlex,
    StyledFormSection,
    StyledFormWrap,
} from "../ActivityForm/ActivityForm.styled";
import { StyledButton, StyledToolbar } from "../Global/Global.styled";

export default function ActivityFilter({
    onSubmit,
    heading,
    isActivityFilterMode,
    setIsActivityFilterMode,
}) {
    return (
        <StyledFormWrap>
            <form onSubmit={onSubmit}>
                <StyledFormFieldset>
                    <legend>{heading}</legend>
                    <StyledFormFlex>
                        <StyledFormSection></StyledFormSection>
                        <StyledToolbar>
                            <StyledButton type="submit">Apply</StyledButton>
                            <StyledButton
                                onClick={() => setIsActivityFilterMode(false)}
                            >
                                Reset
                            </StyledButton>
                        </StyledToolbar>
                    </StyledFormFlex>
                </StyledFormFieldset>
            </form>
        </StyledFormWrap>
    );
}
