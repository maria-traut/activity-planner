import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import styled from "styled-components";
import { SWRConfig } from "swr";
import useLocalStorageState from "use-local-storage-state";

import NavigationBar from "@/components/NavigationBar";
import SplashScreen from "@/components/SplashScreen";
import GlobalStyle from "@/styles";
import type { ActivityFormStatus } from "@/types";

const fetcher = async (resource: string) => {
	const result = await fetch(resource);

	if (!result.ok) {
		throw new Error("An error occurred while fetching the data.");
	}

	return result.json();
};

export default function App({ Component, pageProps }: AppProps) {
	const [bookmarkedActivityIds, setBookmarkedActivityIds] = useLocalStorageState<string[]>(
		"bookmarkedActivityIds",
		{
			defaultValue: [],
		},
	);
	const [navbarLocation, setNavbarLocation] = useState("/");
	function handleNavbarLocation(location: string) {
		setNavbarLocation(location);
	}
	const [isCreateActivityMode, setIsCreateActivityMode] = useState(false);
	const [activityFormStatus, setActivityFormStatus] = useState<ActivityFormStatus>({
		type: "",
		message: "",
	});

	const [theme, setTheme] = useLocalStorageState("theme", {
		defaultValue: "",
	});

	useEffect(() => {
		if (theme === "") {
			const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
			if (prefersDark) {
				setTheme("dark");
			} else {
				setTheme("light");
			}
		} else {
			document.documentElement.classList.remove("dark", "light");
			document.documentElement.classList.add(theme);
		}
	}, [theme]);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const splashScreenTimer = setTimeout(() => {
			setIsLoading(false);
		}, 3000);
		return () => {
			clearTimeout(splashScreenTimer);
		};
	}, []);

	function handleBookmarkToggle(id: string) {
		setBookmarkedActivityIds((prevBookmarkedActivityIds) => {
			const isAdded = prevBookmarkedActivityIds.includes(id);
			if (isAdded) {
				return prevBookmarkedActivityIds.filter((bookmarkId) => bookmarkId !== id);
			}

			return [...prevBookmarkedActivityIds, id];
		});
	}

	function handleBookmarkedActivityIdsDelete(id: string) {
		setBookmarkedActivityIds((prevBookmarkedActivityIds) =>
			prevBookmarkedActivityIds.filter((bookmarkId) => bookmarkId !== id),
		);
	}

	return (
		<>
			<Toaster
				position="bottom-center"
				reverseOrder={false}
				gutter={12}
				containerStyle={{
					bottom: 80,
				}}
			/>
			<GlobalStyle />
			<SWRConfig value={{ fetcher }}>
				{isLoading ? (
					<SplashScreen />
				) : (
					<StyledPageWrapper>
						<Component
							{...pageProps}
							navbarLocation={navbarLocation}
							onNavbarLocation={handleNavbarLocation}
							bookmarkedActivityIds={bookmarkedActivityIds}
							handleBookmarkToggle={handleBookmarkToggle}
							onBookmarkedActivityIdsDelete={handleBookmarkedActivityIdsDelete}
							isCreateActivityMode={isCreateActivityMode}
							setIsCreateActivityMode={setIsCreateActivityMode}
							activityFormStatus={activityFormStatus}
							setActivityFormStatus={setActivityFormStatus}
						/>
						<NavigationBar setTheme={setTheme} />
					</StyledPageWrapper>
				)}
			</SWRConfig>
		</>
	);
}
const StyledPageWrapper = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;

	animation: fadeIn 0.5s ease forwards;

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;
