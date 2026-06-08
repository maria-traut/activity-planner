import { scrollToTop } from "@/components/Global";

export default function ScrollToTopButton() {
    return (
        <button type="button" onClick={() => scrollToTop()}>
            &#128285;
        </button>
    );
}
