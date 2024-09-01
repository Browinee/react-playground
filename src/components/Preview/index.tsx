import { useContext, useEffect, useState } from "react";
import Editor from "../CodeEditor/Editor";
import { compile } from "./compiler";
import { PlaygroundContext } from "../../store/PlaygroundProvider";
import iframeRaw from "./iframe.html?raw";
import { useGetIframe } from "./useGetIframe";
import { Message } from "../Message";
import { useIframeErrorHandler } from "./useIframeErrorHandler";

export default function Preview() {
  const { selectedFileName, files } = useContext(PlaygroundContext);
  const [compiledCode, setCompiledCode] = useState("");
  const { iframeUrl } = useGetIframe(files, compiledCode);

  const { error } = useIframeErrorHandler();
  useEffect(() => {
    const res = compile(files);
    setCompiledCode(res);
  }, [selectedFileName]);

  return (
    <div style={{ height: "100%" }}>
      <iframe
        src={iframeUrl}
        style={{
          width: "100%",
          height: "100%",
          padding: 0,
          border: "none",
        }}
      />
      <Message type="error" content={error} />

      {/* <Editor
        file={{
          name: "dist.js",
          value: compiledCode,
          language: "javascript",
        }}
      /> */}
    </div>
  );
}
