import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constants";

const Login = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [about, setAbout] = useState("");
    const [error,setError] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async() => {
       try {
        const res = await axios.post(BASE_URL+ "/login",{
        emailId,password
       }, {withCredentials: true}); 
       console.log(res.data);
       dispatch(addUser(res.data));
       return navigate("/feed");
       }catch(err){
        setError(err?.response?.data || "Something is wrong");
       }
    }

    const handleSignup = async () => {
      try {
        const res = await axios.post(BASE_URL + "/signup", {firstName, lastName, emailId, password, age, gender, about}, {withCredentials: true});
        console.log("Singup response", res?.data?.data);
        dispatch(addUser(res?.data?.data));
        return navigate("/profile");
      }catch(err){
        console.log(err);
        setError(err?.response?.data || "Something is wrong");
      }
    }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "Login" : "SignUp"}</h2>
          <div>
          {!isLoginForm && (<>
          <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text">First Name: </span>
              </div>
              <input
                type="text"
                value={firstName}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Last Name: </span>
              </div>
              <input
                type="text"
                value={lastName}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {setLastName(e.target.value)}}
              />
            </label>
            <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text">Age: </span>
              </div>
              <input
                type="text"
                value={age}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text">Gender: </span>
              </div>
              <input
                type="text"
                value={gender}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setGender(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text">About: </span>
              </div>
              <input
                type="text"
                value={about}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>
            </>)}
            <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text">Email ID:</span>
              </div>
              <input
                type="text"
                value={emailId}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password:</span>
              </div>
              <input
                type="text"
                value={password}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {setPassword(e.target.value)}}
              />
             
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignup}>{isLoginForm ? "Login" : "Signup"}</button>
          </div>
          <p className="m-auto cursor-pointer" onClick={() => setIsLoginForm((val) => !val)}>{isLoginForm ? "New User? Signup here" : "Existing User? Login here"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
