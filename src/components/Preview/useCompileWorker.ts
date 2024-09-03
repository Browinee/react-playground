import { useEffect, useRef } from "react";
import CompileWorker from "./compiler.worker?worker";
import { debounce } from "lodash-es";
import { Files } from "../../store/PlaygroundProvider";

interface MessageData {
  data: {
    type: string;
    message: string;
  };
}
export const useCompileWorker = (files: Files, dataHandler: Function) => {
  const compilerWorkerRef = useRef<Worker>();
  useEffect(() => {
    if (!compilerWorkerRef.current) {
      compilerWorkerRef.current = new CompileWorker();
      compilerWorkerRef.current.addEventListener("message", ({ data }) => {
        if (data.type === "COMPILED_CODE") {
          dataHandler(data.data);
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
  return {
    compilerWorkerRef,
  };
};
