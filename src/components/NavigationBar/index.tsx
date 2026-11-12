import Image from "next/image";
import { useRouter } from "next/router";
import type { Dispatch, SetStateAction } from "react";

import BookmarkIcon from "@/components/icons/BookmarkIcon";
import HomeIcon from "@/components/icons/HomeIcon";
import MapIcon from "@/components/icons/MapIcon";

import {
	StyledNavigation,
	StyledNavigationBar,
	StyledNavigationButton,
	StyledNavigationLink,
} from "./NavigationBar.styled";

interface Props {
	setTheme: Dispatch<SetStateAction<string>>;
}

export default function NavigationBar({ setTheme }: Props) {
	const router = useRouter();

	return (
		<StyledNavigationBar>
			<StyledNavigation>
				<li>
					<StyledNavigationLink
						$isActive={router?.pathname === "/"}
						href="/"
						aria-label="Home"
					>
						<HomeIcon />
					</StyledNavigationLink>
				</li>
				<li>
					<StyledNavigationLink
						$isActive={router?.pathname === "/map"}
						href="/map"
						aria-label="Activity Map"
					>
						<MapIcon />
					</StyledNavigationLink>
				</li>
				<li>
					<StyledNavigationLink
						$isActive={router?.pathname === "/bookmarks"}
						href="/bookmarks"
						aria-label="My Beekmarks"
					>
						<BookmarkIcon />
					</StyledNavigationLink>
				</li>
				<li>
					<StyledNavigationButton
						type="button"
						onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
					>
						<Image
							src="/icons/light-dark-switch.svg"
							alt="switch between light and dark mode"
							width={30}
							height={30}
						/>
					</StyledNavigationButton>
				</li>
			</StyledNavigation>
		</StyledNavigationBar>
	);
}
