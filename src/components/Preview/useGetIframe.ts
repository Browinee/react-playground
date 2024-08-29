import { useEffect, useState } from "react";
import { IMPORT_MAP_FILE_NAME } from "../../files";
import iframeRaw from "./iframe.html?raw";
import { Files } from "../../store/PlaygroundProvider";

const getIframeUrl = (files: Files, compiledCode: string) => {
  const res = iframeRaw
    .replace(
      '<script type="importmap"></script>',
      `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
    )
    .replace(
      '<script type="module" id="appSrc"></script>',
      `<script type="module" id="appSrc">${compiledCode}</script>`
    );
  return URL.createObjectURL(new Blob([res], { type: "text/html" }));
};
export const useGetIframe = (files: Files, compiledCode: string) => {
  const [iframeUrl, setIframeUrl] = useState(getIframeUrl(files, compiledCode));

  useEffect(() => {
    setIframeUrl(getIframeUrl(files, compiledCode));
  }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode]);

  return {
    iframeUrl,
  };
};
