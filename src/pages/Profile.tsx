import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/FirebaseConfig";
import SignInButton from "../Components/SignInButton";
import SignOutButton from "../Components/SignOutButton";
const Profile = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return   <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    alignItems: "center",
    justifyContent: "center",
  }}
>Loading user...</div>;
  if (error) return (
     
  <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <p>Error occurred: {error?.message}</p>;
  </div>
  )

  
  if (!user)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>Please sign in</p>

        <SignInButton />
      </div>
    );

  const { displayName, email, photoURL } = user;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        padding: "2rem",
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: "50%",
          width: "100px",
          height: "100px",
          padding: "1rem",
          objectFit: "cover",
          objectPosition: "center",
          overflow: "hidden",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",

            border: "1px solid #000",
          }}
          src={photoURL ? photoURL : ""}
          alt={"Profile loading"}
        />
      </div>
      <p className="display-name">{displayName}</p>
      <p className="display-email">{email}</p>

      <SignOutButton/>
    </div>
  );
};

export default Profile;
