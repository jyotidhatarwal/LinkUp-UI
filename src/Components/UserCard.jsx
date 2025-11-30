import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {
    console.log("User -->",user);
    const{_id, firstName, lastName, photoUrl, gender, skills, about, age} = user;

    const dispatch = useDispatch();


    const handleSendRequest = async (status,userId) => {
        try{
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {withCredentials: true});
            console.log("Handl send response ", res);
            dispatch(removeUserFromFeed(userId));
        }catch(err){
            console.log(err);
        }
    }

   
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      {photoUrl&& <figure>
        <img
          src={user.photoUrl}
          alt="User-Photo"
        />
      </figure>}
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        {about && <p>{about}</p>}
        {skills && <p>{skills.join(", ")}</p>}
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary" onClick={() => handleSendRequest("ignored",_id)}>Ignore</button>
          <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
