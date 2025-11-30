import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {

    const connections = useSelector(store => store.connections);

    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {withCredentials: true});
            console.log("Response from fetch connections ", res?.data?.data);
            dispatch(addConnection(res?.data?.data));
        }catch(err){
            console.log("Error->", err);
        }
    }

    useEffect(() => {
        fetchConnections();
    },[]);

    if(!connections) return;

    if(connections.length === 0){
        return(
            <h1 className="flex justify-center my-10 text-bold text-2xl">No connections found</h1>
        )
    }

    return(
        <div className="text-center my-10">
            <h1 className="text-bold text-2xl">Connections</h1>

            {connections.map((connection) => {

                const {_id, firstName, lastName, photoUrl, age, gender, about} = connection;
                console.log("Connection object", connection);
                return (
                <div key={_id} className="flex m-4 p-4 border rounded-lg w-1/2 mx-auto">
                    <div>
                    {photoUrl && <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl} />}
                    </div>
                    <div className="text-left mx-4">
                        {firstName && lastName && <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>}
                        {age && gender && <p>{age + ", " + gender}</p>}
                        {about && <p>{about}</p>}
                    </div>
                    
                </div>
                )
            })}
        </div>
    );
}

export default Connections;