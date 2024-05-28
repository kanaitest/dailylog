import { useCollection } from "react-firebase-hooks/firestore";
import { doc, collection, query, orderBy, deleteDoc } from "firebase/firestore";
import { db } from "../lib/FirebaseConfig";
import { FaTrashCan } from "react-icons/fa6";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const LogsLister = ({ userid }: { userid: string }) => {
  const LogsRef = doc(db, "logs", userid);
  const q = query(collection(LogsRef, "logs"), orderBy("timestamp", "desc"));
  const [snapshot, loading, error] = useCollection(q);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (snapshot) {
    if (snapshot.empty) {
      return (
        <>
          <p>No Logs Added </p>
          <Link className="link" to={"/create"}>
            Add New
          </Link>
        </>
      );
    }

    const logs = snapshot.docs.map((doc) => ({
      content: doc.data().content,
      time: doc.data().time,
      timestamp: doc.data().timestamp,
      id: doc.id,
    }));
 

    return (
      <>
        {logs.map((item) => (
          <div key={item.id} className="card">
            <div className="card-header">
              <p>{item.time}</p>

              <button
                onClick={async () => {
                  const targetDocRef = doc(LogsRef, "logs", item.id);
                  try {
                    await deleteDoc(targetDocRef);
                  } catch (error: any) {
                    toast.error(`Delete process Failed! : ${error?.message}`);
                  }
                }}
                className="icon-btn"
              >
                <FaTrashCan className="icon-delete icon" />
              </button>
            </div>
            <div
              className="content-html"
              dangerouslySetInnerHTML={{ __html: item.content }}
            ></div>
          </div>
        ))}
      </>
    );
  }
};

export default LogsLister;
