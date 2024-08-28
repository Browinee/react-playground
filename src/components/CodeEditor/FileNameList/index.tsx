import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../store/PlaygroundProvider";
import { FileNameItem } from "./FileNameItem";
import "./index.scss";

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
    <div className="tabs">
      {tabs.map((item, index) => (
        <FileNameItem
          key={item + index}
          value={item}
          active={selectedFileName === item}
          onClick={() => setSelectedFileName(item)}
        ></FileNameItem>
      ))}
    </div>
  );
}
