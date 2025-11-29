const UserCard = ({user}) => {
    console.log("User -->",user);
    const{firstName, lastName, photoUrl, gender, skills, about, age} = user;
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
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
