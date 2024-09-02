import { useContext } from "react";
import logoSvg from "./icons/logo.svg";
import "./index.scss";
import copy from "copy-to-clipboard";
import {
  DownloadOutlined,
  MoonOutlined,
  ShareAltOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { message } from "antd";

import { PlaygroundContext } from "../../store/PlaygroundProvider";
import { downloadFiles } from "../../utils";

export default function Header() {
  const { files, theme, setTheme } = useContext(PlaygroundContext);

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
        <ShareAltOutlined
          style={{ marginLeft: "10px" }}
          onClick={() => {
            copy(window.location.href);
            message.success("shared link is copied");
          }}
        />
        <DownloadOutlined
          style={{ marginLeft: "10px" }}
          onClick={async () => {
            await downloadFiles(files);
            message.success("Finish donload");
          }}
        />
      </div>
    </div>
  );
}
