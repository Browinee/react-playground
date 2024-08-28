import classnames from "classnames";
import React, { useState, useRef, useEffect } from "react";

export interface FileNameItemProps {
  value: string;
  active: boolean;
  onClick: () => void;
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const { value, active = false, onClick } = props;

  const [name, setName] = useState(value);

  return (
    <div className={classnames("tab-item", { active })} onClick={onClick}>
      <span>{name}</span>
    </div>
  );
};
