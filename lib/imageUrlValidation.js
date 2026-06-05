const IMAGE_MIME_TYPES = [
    "image/apng", // Animated Portable Network Graphics (APNG)
    "image/avif", // AV1 Image File Format (AVIF)
    "image/gif", // Graphics Interchange Format (GIF)
    "image/jpeg", // JPEG
    "image/png", // Portable Network Graphics (PNG)
    "image/svg+xml", // Scalable Vector Graphics (SVG)
    "image/webp", // WebP
];

export async function isImageUrl(url) {
    try {
        let response = await fetch(url, {
            method: "HEAD",
            redirect: "follow",
        });

        const contentType = response.headers.get("content-type");

        return IMAGE_MIME_TYPES.includes(contentType) ?? false;
    } catch {
        return false;
    }
}

export async function handleImageUrlValidation(input) {
    const inputValue = input?.value;

    if (inputValue !== "") {
        const isImage = inputValue ? await isImageUrl(inputValue) : false;

        if (!isImage) {
            input.setCustomValidity("URL is not linking to a valid image");
            input.reportValidity();
            return;
        }
    }
    input.setCustomValidity("");
}
