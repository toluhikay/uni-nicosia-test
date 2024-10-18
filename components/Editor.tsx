"use client";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import styles from "@/components/styles/editor.module.css";
import { useEffect } from "react";

const Editor = ({ text, setText }: { text: any; setText: React.Dispatch<React.SetStateAction<any>> }) => {
  // const [text, setText] = useState<string>("");
  useEffect(() => {}, [text]);

  const modules = {
    toolbar: false, // This disables the toolbar
  };

  const handleChange = (value: string) => {
    setText(value);
  };

  return (
    <div className={styles.editorWrapper}>
      <ReactQuill
        theme="snow"
        value={text}
        modules={modules}
        style={{ width: "100%", backgroundColor: "#121212", color: "#797979", fontSize: "16px", border: "1px solid gray", borderRadius: "8px", maxHeight: "20rem", overflow: "auto", scrollbarColor: "blue" }}
        placeholder="Type '/' for quick access to the command menu. Use '||' to enter multiple prompts."
        className={styles.borderless}
        onChange={handleChange}
      />
      {!text && <div className={styles.placeholder}>Type '/' for quick access to the command menu. Use '||' to enter multiple prompts.</div>}
    </div>
  );
};

export default Editor;
