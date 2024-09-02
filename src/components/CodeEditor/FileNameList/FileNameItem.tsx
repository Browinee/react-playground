import classnames from "classnames";
import React, { useState, useRef, useEffect } from "react";

export interface FileNameItemProps {
  value: string;
  active: boolean;
  onClick: () => void;
  onEditComplete: (name: string) => void;
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const { value, active = false, onClick, onEditComplete } = props;

  const [name, setName] = useState(value);

  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDoubleClick = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 0);
  };
  const handleInputBlur = () => {
    setEditing(false);
    onEditComplete(name);
  };

  return (
    <div className={classnames("tab-item", { active })} onClick={onClick}>
      {editing ? (
        <input
          ref={inputRef}
          className={"tabs-item-input"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleInputBlur}
        />
      ) : (
        <span onDoubleClick={handleDoubleClick}>{name}</span>
      )}
    </div>
  );
};
