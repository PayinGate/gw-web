// use with classes

import { useParams } from "react-router";
import useAPI from "./useApi"


function withApi(Component) {
    return function WrappedComponent(props) {
        const params = useParams();
        const api = useAPI();
        return <Component {...props} {...params} api={api} />;
    }
}


export default withApi;