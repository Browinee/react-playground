import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Header from "../Header";
import CodeEditor from "../CodeEditor";
import Preview from "../Preview";
import "./index.scss";
import { PlaygroundContext } from "../../store/PlaygroundProvider";
import { useContext } from "react";

export default function Playground() {
  const { theme, setTheme } = useContext(PlaygroundContext);
  return (
    <div className={theme} style={{ height: "100vh" }}>
      <Header />
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={0}>
          <CodeEditor />
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
          <Preview />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
