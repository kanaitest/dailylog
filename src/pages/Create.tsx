import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/FirebaseConfig";
import SignInButton from '../Components/SignInButton'
import Tiptap from "../Components/TipTap";
const Create = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div className="create">
      <p>Please login</p>
      <SignInButton/>
    </div>;
  }


  return (
    <div className="create">
      <h1>Create New Log </h1>

      <Tiptap userId={user.uid} />
    </div>
  )
}

export default Create