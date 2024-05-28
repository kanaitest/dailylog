import { doc, getDocs, setDoc, collection, query,serverTimestamp, Timestamp } from "firebase/firestore"; 
import { db } from "./FirebaseConfig";

type Log = {
    content: string;
    time: string;
}

type LogRes = {
    id:string;
    content: string;
    time: string;
    timestamp: Timestamp;
}

// add new log to firestore
const AddNewLog = async (log:Log, userId:string): Promise<boolean> => {
  try {
    if (!log || !log.content || !log.time) {
      throw new Error('Invalid log object.');
    }

    if (!userId) {
      throw new Error('Invalid userId.');
    }

    const LogsRef = doc(db, 'logs', userId);
    const logCollectionRef = collection(LogsRef, 'logs');
    await setDoc(doc(logCollectionRef, Date.now().toString()), {
      content: log.content,
      time: log.time,
      timestamp: serverTimestamp(),
    });

    return true;
  } catch (error:any) {
    console.error('Error writing log:', error?.message);
    return false
  }
};




// get all logs from firestore
const GetLogs = async (userId:string)=>{
  const LogsRef = doc(db, 'logs', userId);
    const q = query(collection(LogsRef, 'logs'))
    const snapshot = await getDocs(q)
    const logs: LogRes[] =[]

    if(snapshot.empty){
        return logs
    }
    
    if(snapshot.docs)
    snapshot.forEach((doc) => {
        logs.push({
            content:doc.data().content,
            time:doc.data().time,
            timestamp:doc.data().timestamp,
            id:doc.id
        })
    })
    return logs
}

export {AddNewLog, GetLogs }