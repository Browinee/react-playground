import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../store/PlaygroundProvider";

export default function FileNameList() {
  const {
    files,
    removeFile,
    addFile,
    updateFileName,
    selectedFileName,
    setSelectedFileName,
  } = useContext(PlaygroundContext);

  const [tabs, setTabs] = useState([""]);

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  return (
    <div>
      {tabs.map((item, index) => (
        <div onClick={() => setSelectedFileName(item)}>{item}</div>
      ))}
    </div>
  );
}
