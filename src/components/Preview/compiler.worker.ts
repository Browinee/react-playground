import { transform } from "@babel/standalone";
import { ENTRY_FILE_NAME } from "../../files";
import type { CustomFile, Files } from "../../store/PlaygroundProvider";
import { PluginObj } from "@babel/core";
import { beforeTransformCode, css2Js, getModuleFile, json2Js } from "./utils";

function customResolver(files: Files): PluginObj {
  return {
    visitor: {
      ImportDeclaration(path) {
        const modulePath = path.node.source.value;
        if (modulePath.startsWith(".")) {
          const file = getModuleFile(files, modulePath);
          if (!file) {
            return;
          }
          if (file.name.endsWith(".css")) {
            path.node.source.value = css2Js(file);
          } else if (file.name.endsWith(".json")) {
            path.node.source.value = json2Js(file);
          } else {
            path.node.source.value = URL.createObjectURL(
              new Blob([babelTransform(file.name, file.value, files)], {
                type: "application/javascript",
              })
            );
          }
        }
      },
    },
  };
}
export const babelTransform = (
  filename: string,
  code: string,
  files: Files
) => {
  let _code = beforeTransformCode(filename, code);

  let result = "";
  try {
    result = transform(_code, {
      presets: ["react", "typescript"],
      filename,
      plugins: [customResolver(files)],
      retainLines: true,
    }).code!;
  } catch (e) {
    console.error("compile error", e);
  }
  return result;
};

export const compile = (files: Files) => {
  const main = files[ENTRY_FILE_NAME];
  return babelTransform(ENTRY_FILE_NAME, main.value, files);
};

self.addEventListener("message", async ({ data }) => {
  try {
    self.postMessage({
      type: "COMPILED_CODE",
      data: compile(data),
    });
  } catch (e) {
    self.postMessage({ type: "ERROR", error: e });
  }
});
