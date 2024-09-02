import { useContext, useEffect, useRef, useState } from "react";
import Editor from "../CodeEditor/Editor";
import { PlaygroundContext } from "../../store/PlaygroundProvider";
import iframeRaw from "./iframe.html?raw";
import { useGetIframe } from "./useGetIframe";
import { Message } from "../Message";
import { useIframeErrorHandler } from "./useIframeErrorHandler";
import CompileWorker from "./compiler.worker?worker";
import { debounce } from "lodash-es";

interface MessageData {
  data: {
    type: string;
    message: string;
  };
}
export default function Preview() {
  const { selectedFileName, files } = useContext(PlaygroundContext);
  const [compiledCode, setCompiledCode] = useState("");
  const { iframeUrl } = useGetIframe(files, compiledCode);

  const { error } = useIframeErrorHandler();

  const compilerWorkerRef = useRef<Worker>();
  useEffect(() => {
    if (!compilerWorkerRef.current) {
      compilerWorkerRef.current = new CompileWorker();
      compilerWorkerRef.current.addEventListener("message", (data) => {
        console.log("worker", data);
        if (data.type === "COMPILED_CODE") {
          setCompiledCode(data.data);
        } else {
          //console.log('error', data);
        }
      });
    }
  }, []);

  useEffect(
    debounce(() => {
      compilerWorkerRef.current?.postMessage(files);
    }, 500),
    [files]
  );

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
