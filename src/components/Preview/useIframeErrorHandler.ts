import { useEffect, useState } from "react";
import { IMPORT_MAP_FILE_NAME } from "../../files";
import iframeRaw from "./iframe.html?raw";
import { Files } from "../../store/PlaygroundProvider";

export interface MessageData {
  data: {
    type: string;
    message: string;
  };
}
export const useIframeErrorHandler = () => {
  const [error, setError] = useState("");

  const handleMessage = (msg: MessageData) => {
    const { type, message } = msg.data;
    if (type === "ERROR") {
      setError(message);
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
  return {
    error,
  };
};
