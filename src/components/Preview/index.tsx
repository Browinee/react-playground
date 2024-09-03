import { useContext, useEffect, useRef, useState } from "react";
import Editor from "../CodeEditor/Editor";
import { PlaygroundContext } from "../../store/PlaygroundProvider";
import iframeRaw from "./iframe.html?raw";
import { useGetIframe } from "./useGetIframe";
import { Message } from "../Message";
import { useIframeErrorHandler } from "./useIframeErrorHandler";
import CompileWorker from "./compiler.worker?worker";
import { debounce } from "lodash-es";
import { useCompileWorker } from "./useCompileWorker";

interface MessageData {
  data: {
    type: string;
    message: string;
  };
}
export default function Preview() {
  const { files } = useContext(PlaygroundContext);
  const [compiledCode, setCompiledCode] = useState("");
  const { iframeUrl } = useGetIframe(files, compiledCode);

  const { error } = useIframeErrorHandler();
  useCompileWorker(files, setCompiledCode);
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
