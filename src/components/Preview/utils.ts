import { CustomFile, Files } from "../../store/PlaygroundProvider";

export const getModuleFile = (files: Files, modulePath: string) => {
  let moduleName = modulePath.split("./").pop() || "";
  if (!moduleName.includes(".")) {
    const realModuleName = Object.keys(files)
      .filter((key) => {
        return (
          key.endsWith(".ts") ||
          key.endsWith(".tsx") ||
          key.endsWith(".js") ||
          key.endsWith(".jsx")
        );
      })
      .find((key) => {
        return key.split(".").includes(moduleName);
      });
    if (realModuleName) {
      moduleName = realModuleName;
    }
  }
  return files[moduleName];
};

export const json2Js = (file: CustomFile) => {
  const js = `export default ${file.value}`;

  return URL.createObjectURL(
    new Blob([js], { type: "application/javascript" })
  );
};

export const css2Js = (file: CustomFile) => {
  const randomId = new Date().getTime();
  const js = `
(() => {
  const stylesheet = document.createElement('style')
  stylesheet.setAttribute('id', 'style_${randomId}_${file.name}')
  document.head.appendChild(stylesheet)

  const styles = document.createTextNode(\`${file.value}\`)
  stylesheet.innerHTML = ''
  stylesheet.appendChild(styles)
})()
  `;
  return URL.createObjectURL(
    new Blob([js], { type: "application/javascript" })
  );
};

export const beforeTransformCode = (filename: string, code: string) => {
  let _code = code;
  const regexReact = /import\s+React/g;
  if (
    (filename.endsWith(".jsx") || filename.endsWith(".tsx")) &&
    !regexReact.test(code)
  ) {
    _code = `import React from 'react';\n${code}`;
  }
  return _code;
};
