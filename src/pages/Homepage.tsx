import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/FirebaseConfig";
import SignInButton from "../Components/SignInButton";
import LogsLister from "../Components/LogsLister";

const Homepage = () => {
  const [user, loading, error] = useAuthState(auth);

  if (error && !loading) {
    return (
      <div
        style={{
          margin: "auto",
          textAlign: "center",
        }}
      >
        <h1>An error Occured!</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{
          margin: "auto",
          textAlign: "center",
        }}
      >
        <h1>Loading ....</h1>
      </div>
    );
  }

  if (!user) {
    // get
    return (
      <div
        style={{
          margin: "auto",
          textAlign: "center",
        }}
      >
        <SignInButton />
      </div>
    );
  }

  // user exist so use userid to get data from db

  return (
    <div className="homepage">
      <h1>Recent Logs</h1>

      {/* cards for each log found in db */}
      <div className="cards-holder">
        <LogsLister userid={user.uid} />
      </div>
    </div>
  );
};

export default Homepage;
