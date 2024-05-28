import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import MenuBar from "./MenuBar";
import { AddNewLog } from "../lib/DataManipulation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default ({userId}:{userId:string}) => {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content: `New Content goes here`
  });

  const navigate = useNavigate();

  if (!editor) return null;

  return (
    <form 
    onSubmit={async(e)=>{
      e.preventDefault();
      const log ={
        content: editor.getHTML(),
        time: new Date().toLocaleString()
      }

      // add log to firestore
     const res =  await AddNewLog(log,userId)
     if(res!==true){
      toast.error('An error has occurred')
     }

     toast.success('New Log added')
    //  redirect to homepage
    navigate('/')

    }}
      style={{
        width: "100%",
        minHeight: "50vh",
        border: "2px",
        borderColor: "aqua",
        borderStyle: "solid",
        listStylePosition: "inside",
        padding: "10px",
        fontSize: "1.2rem",
        fontFamily: "monospace",
        color: "white",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MenuBar editor={editor} />
      <EditorContent
      className="editor"
        style={{
          width: "100%",
          minHeight: "50vh",
          border: "2px",
        }}
        editor={editor}
      />

      <button  className="submit-btn" type="submit">Submit</button>
    </form>
  );
};
