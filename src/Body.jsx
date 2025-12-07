import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const Body = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(store => store.user);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        if (userData) {
            console.log("No user data is present");
            setLoading(false);
            return;
          }
       try{
        const res = await axios.get(BASE_URL + "/profile/view",{withCredentials:true})
        dispatch(addUser(res.data));
        navigate("/feed");
       }catch(err){
        if(err.status === 401){
            return navigate("/login");
        }
       }finally {
        setLoading(false);
      }
    };

    useEffect(() => {
        fetchUser();
    },[]);

    if (loading) {
        return (
          <div className="flex h-screen items-center justify-center text-xl font-semibold">
            Loading...
          </div>
        );
      }

    return (
        <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    )
}

export default Body;