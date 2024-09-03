import { useContext } from "react";
import Editor from "./Editor";
import FileNameList from "./FileNameList";
import { PlaygroundContext } from "../../store/PlaygroundProvider";
import { debounce } from "lodash-es";

export default function CodeEditor() {
  const { theme, files, setFiles, selectedFileName } =
    useContext(PlaygroundContext);
  const file = files[selectedFileName];

  const onEditorChange = debounce((value?: string) => {
    files[file.name].value = value!;
    setFiles({ ...files });
  }, 500);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <FileNameList />
      <Editor
        file={file}
        onChange={onEditorChange}
        options={{
          theme: `vs-${theme}`,
        }}
      />
    </div>
  );
}
