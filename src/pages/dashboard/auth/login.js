/* eslint-disable no-unused-vars */
import useAPI from "../../../hooks/useApi"

export default function Login(){
    
    const { post } = useAPI();

    const login = async (e)=>{
        e.preventDefault();
    }
    return <div className="">
        <form onSubmit={e=>login(e)}>
            <input type="text" placeholder="email" />
            <input type="text" placeholder="password" />
        </form>
    </div>
}