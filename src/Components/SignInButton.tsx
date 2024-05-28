import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../lib/FirebaseConfig";

const SignInButton = () => {
  const [signInWithGoogle, loading, error] = useSignInWithGoogle(auth);

  if (error && !loading) {
    return (
      <div
        style={{
          color: "red",
          textAlign: "center",
          margin: "auto",
        }}
      >
        Error: Could not Sign in
      </div>
    );
  }

  if (!error && !loading)
    return (
      <button
        onClick={async () => await signInWithGoogle()}
        className="sign-in-btn"
      >
        {loading ? "Loading..." : "Sign in with Google"}
      </button>
    );
};

export default SignInButton;
