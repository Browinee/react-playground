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

  const handleEditComplete = (name: string, prevName: string) => {
    updateFileName(prevName, name);
    setSelectedFileName(name);
    setCreating(false);
  };
  const [creating, setCreating] = useState(false);
  const addTab = () => {
    addFile("Comp" + Math.random().toString().slice(2, 8) + ".tsx");
    setCreating(true);
  };
  return (
    <div className="tabs">
      {tabs.map((item, index, arr) => (
        <FileNameItem
          key={item + index}
          value={item}
          creating={creating && index === arr.length - 1}
          active={selectedFileName === item}
          onClick={() => setSelectedFileName(item)}
          onEditComplete={(name) => handleEditComplete(name, item)}
        ></FileNameItem>
      ))}
      <div className={"add"} onClick={addTab}>
        +
      </div>
    </div>
  );
}
