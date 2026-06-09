export default function HomeIcon({
    size = 30,
    bodyColor = "var(--main-500)",
    outlineColor = "var(--main-900)",
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 423 401"
            style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
        >
            <path
                d="M211,6l167,98l-1,193l-168,96l-167,-98l1,-193l168,-96Z"
                fill={outlineColor}
            />
            <path
                id="EyeR"
                d="M343,236c-9,30 -33,51 -60,50c-35,-1 -62,-35 -61,-77c1,-42 29,-75 64,-75c22,0 40,14 51,34c-5,-3 -11,-5 -17,-5c-21,-0 -38,18 -38,40c-0,22 16,41 37,41c9,0 18,-3 25,-10Z"
                fill={bodyColor}
            />
            <path
                id="EyelL"
                d="M198,236c-9,30 -33,51 -60,50c-35,-1 -62,-35 -61,-77c1,-42 29,-75 64,-75c22,0 40,14 51,34c-5,-3 -11,-5 -17,-5c-21,-0 -38,18 -38,40c-0,22 16,41 37,41c9,0 18,-3 25,-10Z"
                fill={bodyColor}
            />
        </svg>
    );
}
