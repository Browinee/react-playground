import { useContext } from "react";
import logoSvg from "./icons/logo.svg";
import "./index.scss";

import {
  DownloadOutlined,
  MoonOutlined,
  ShareAltOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { PlaygroundContext } from "../../store/PlaygroundProvider";

export default function Header() {
  const { theme, setTheme } = useContext(PlaygroundContext);

  return (
    <div className={"header"}>
      <div className={"logo"}>
        <img alt="logo" src={logoSvg} />
        <span>React Playground</span>
      </div>
      <div className={"links"}>
        {theme === "light" && (
          <MoonOutlined
            title="Switch to dark"
            className={"theme"}
            onClick={() => setTheme("dark")}
          />
        )}
        {theme === "dark" && (
          <SunOutlined
            title="Switch to light"
            className={"theme"}
            onClick={() => setTheme("light")}
          />
        )}
      </div>
    </div>
  );
}
