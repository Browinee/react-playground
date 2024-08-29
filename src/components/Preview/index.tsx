import { useContext, useEffect, useState } from "react";
import Editor from "../CodeEditor/Editor";
import { compile } from "./compiler";
import { PlaygroundContext } from "../../store/PlaygroundProvider";

export default function Preview() {
  const { selectedFileName, files } = useContext(PlaygroundContext);
  const [compiledCode, setCompiledCode] = useState("");
  console.log("files", files);

  useEffect(() => {
    const res = compile(files, selectedFileName);
    setCompiledCode(res);
  }, [selectedFileName]);

  return (
    <div style={{ height: "100%" }}>
      <Editor
        file={{
          name: "dist.js",
          value: compiledCode,
          language: "javascript",
        }}
      />
    </div>
  );
}
