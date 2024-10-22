"use client";
import "react-quill/dist/quill.bubble.css";
import { useEffect, useRef } from "react";
import ReactQuill from "react-quill";

const Editor = ({ text, setText, handleSubmit }: { text: any; setText: React.Dispatch<React.SetStateAction<any>>; handleSubmit?: (e: any) => void }) => {
  useEffect(() => {}, [text]);

  const modules = {
    toolbar: false, // This disables the toolbar
  };

  const quillRef = useRef<ReactQuill | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      const quill = quillRef.current?.getEditor();
      if (quill) {
        const cursorPosition = quill.getSelection()?.index || 0;
        quill.insertText(cursorPosition, "\n");
        quill.setSelection(cursorPosition, 1);
      }
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit && handleSubmit(event);
    }
  };
  const handleChange = (value: string) => {
    setText(value);
  };

  return (
    <div className="w-full h-full overflow-y-auto hidden-scrollbar" onKeyDown={handleKeyDown}>
      <ReactQuill
        ref={quillRef}
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
    </div>
  );
};

export default Editor;
