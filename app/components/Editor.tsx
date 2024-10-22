"use client";
import "react-quill/dist/quill.bubble.css";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Editor = ({ text, setText }: { text: any; setText: React.Dispatch<React.SetStateAction<any>> }) => {
  useEffect(() => {}, [text]);

  const modules = {
    toolbar: false, // This disables the toolbar
  };

  const handleChange = (value: string) => {
    setText(value);
  };

  return (
    <div className="w-full h-full overflow-y-auto hidden-scrollbar">
      <ReactQuill
        theme="bubble"
        value={text}
        modules={modules}
        style={{
          width: "100%",
          backgroundColor: "inherit",
          color: "white",
          overflow: "auto",
        }}
        placeholder="Type '/' for quick access to the command menu. Use '||' to enter multiple prompts."
        className={`hidden-scrollbar p-0`}
        onChange={handleChange}
      />
      {/* {!text && <div className={styles.placeholder}>Type '/' for quick access to the command menu. Use '||' to enter multiple prompts.</div>} */}
    </div>
  );
};

export default Editor;
