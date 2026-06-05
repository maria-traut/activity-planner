import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function Map() {
    const { data } = useSWR("https://restcountries.com/v3.1/alpha/PE", fetcher);
    console.log(data);

    const coords = data?.[0]?.latlng;

    console.log(coords);

    return <p>My Activity Map</p>;
}
