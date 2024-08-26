import { setupTypeAcquisition } from "@typescript/ata";
import typescriprt from "typescript";

export function createATA(
  onDownloadFile: (code: string, path: string) => void
) {
  const ata = setupTypeAcquisition({
    projectName: "my-ata",
    typescript: typescriprt,
    logger: console,
    delegate: {
      receivedFile: (code, path) => {
        console.log("auto download: ", path);
        onDownloadFile(code, path);
      },
    },
  });

  return ata;
}
