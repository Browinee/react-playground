import { strFromU8, strToU8, unzlibSync, zlibSync } from "fflate";
import { Files } from "../store/PlaygroundProvider";
import JSZip from "jszip";
import saveAs from "file-saver";

const LANGUAGE_MAP: { [key: string]: string } = {
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  json: "json",
  css: "css",
};
export const fileName2Language = (name: string) => {
  const suffix = name.split(".").pop() || "";
  return LANGUAGE_MAP[suffix] || "javascript";
};

export function compress(data: string): string {
  const buffer = strToU8(data);
  const zipped = zlibSync(buffer, { level: 9 });
  const str = strFromU8(zipped, true);
  return btoa(str);
}

export function uncompress(base64: string): string {
  const binary = atob(base64);

  const buffer = strToU8(binary, true);
  const unzipped = unzlibSync(buffer);
  return strFromU8(unzipped);
}

export async function downloadFiles(files: Files) {
  const zip = new JSZip();

  Object.keys(files).forEach((name) => {
    zip.file(name, files[name].value);
  });

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, `code${Math.random().toString().slice(2, 8)}.zip`);
}
