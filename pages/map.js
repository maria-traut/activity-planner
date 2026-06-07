import useSWR from "swr";
import dynamic from "next/dynamic";
import Head from "next/head";
import Header from "@/components/Header";
import {
    StyledToolbar,
    StyledToolbarWrap,
} from "@/components/Global/Global.styled";

const ActivityMap = dynamic(() => import("@/components/ActivityMap"), {
    ssr: false,
});

export default function Map({ handleNavbarLocation }) {
    const { data: activities, isLoading, error } = useSWR("/api/activities");

    if (isLoading) {
        return (
            <div>
                <Head>
                    <title> Activity Planner</title>
                </Head>
                <Header title="My ActiviBee Map" />
                <main>
                    <StyledToolbarWrap>
                        <StyledToolbar />
                    </StyledToolbarWrap>
                    <p>Loading activity map...</p>
                </main>
            </div>
        );
    }

    if (!activities || error) {
        return (
            <div>
                <Head>
                    <title> Activity Planner</title>
                </Head>
                <Header title="My ActiviBee Map" />
                <main>
                    <StyledToolbarWrap>
                        <StyledToolbar />
                    </StyledToolbarWrap>
                    <p>An error occurred while fetching the activity map.</p>
                </main>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>My Activity Map | Activity Planner</title>
            </Head>
            <Header title="My ActiviBee Map" />
            <main>
                <ActivityMap
                    activities={activities}
                    onNavbarLocation={handleNavbarLocation}
                />
            </main>
        </>
    );
}
