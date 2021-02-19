import { useReducer } from "react";
import { useEffect } from "react";
import { requestFailed, requestStarted, requestSuccessful } from "./actionGet";
import { reducerGet } from "./reducerGet";
const useGet = (cb, query) => {
    const [state, dispatch] = useReducer(reducerGet, {
        loading: true,
        error: null,
        data: null,
    });
    useEffect(() => {
        let isCancelled = false;
        (async () => {
            dispatch(requestStarted());
            try {
                const data = await cb(query);
                if (!isCancelled) {
                    dispatch(requestSuccessful({ data }));
                }
            } catch (e) {
                if (!isCancelled) {
                    dispatch(requestFailed({ error: e.message }));
                }
            }
        })()
        return () => {
            isCancelled = true;
        }
        // eslint-disable-next-line
    }, []);

    return state
};
export default useGet