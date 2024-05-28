import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../lib/FirebaseConfig";
const SignOutButton = () => {
  const [signOut, loading, error] = useSignOut(auth);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return <button className="sign-out-btn" onClick={async()=>await signOut()} >{loading ? "Loading..." : "Sign Out"}</button>;
};

export default SignOutButton;
