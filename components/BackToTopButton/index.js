import { scrollToTop } from "@/components/Global";
import { StyledTopButton } from "./BackToTopButton.styled";
import { useEffect, useState } from "react";

export default function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        function handleScroll() {
            setIsVisible(window.scrollY > 300);
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return isVisible ? (
        <StyledTopButton
            type="button"
            aria-label="Scroll back to top"
            onClick={() => scrollToTop()}
        >
            &#128285;
        </StyledTopButton>
    ) : null;
}
