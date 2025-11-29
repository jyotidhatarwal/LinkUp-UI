import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "./utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./Components/UserCard";

const Feed = () => {
    const feed = useSelector(store => store.feed);
    console.log("This is feed -->", feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        if(feed) return;
        try{
            const res = await axios.get(BASE_URL + "/feed", {withCredentials: true});
            console.log("response from user", res);
            console.log(res?.data?.data);
            dispatch(addFeed(res?.data?.data));

        }catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        getFeed();
    },[]);

    return feed && (
        <div className="flex justify-center my-10">
            <UserCard user={feed[0]} />
        </div>
    )
}

export default Feed;