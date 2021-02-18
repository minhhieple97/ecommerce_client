import { useState, useEffect } from "react";
const useFetchData = (cb, query) => {
    // const [statusCode, setStatusCode] = useState(200);
    const [apiData, setApiData] = useState();

    useEffect(() => {
        (async () => {
            // const { data, status } = await cb(query);
            const data = await cb(query);

            // setStatusCode(status);
            setApiData(data)
        })()
        // eslint-disable-next-line
    }, [query]);

    return { data: apiData }
};
export default useFetchData