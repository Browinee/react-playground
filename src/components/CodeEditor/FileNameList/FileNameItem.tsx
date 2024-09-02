import { Popconfirm } from "antd";
import classnames from "classnames";
import React, { useState, useRef, useEffect, MouseEventHandler } from "react";

export interface FileNameItemProps {
  value: string;
  active: boolean;
  onClick: () => void;
  creating: boolean;
  onRemove: MouseEventHandler;
  onEditComplete: (name: string) => void;
  readonly: boolean;
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const {
    readonly,
    value,
    active = false,
    onClick,
    onEditComplete,
    creating,
    onRemove,
  } = props;

  const [name, setName] = useState(value);

  const [editing, setEditing] = useState(creating);
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

  useEffect(() => {
    if (creating) {
      inputRef?.current?.focus();
    }
  }, [creating]);
  return (
    <div className={classnames("tab-item", { active })} onClick={onClick}>
      {editing ? (
        <input
          ref={inputRef}
          className={"tabs-item-input"}
          value={name}
          onBlur={handleInputBlur}
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        <>
          <span onDoubleClick={!readonly ? handleDoubleClick : () => {}}>
            {name}
          </span>
          {!readonly ? (
            <Popconfirm
              title="Delete file?"
              okText="confirm"
              cancelText="cancel"
              onConfirm={(e) => {
                e?.stopPropagation();
                onRemove(e);
              }}
            >
              <span
                style={{ marginLeft: 5, display: "flex" }}
                // onClick={onRemove}
              >
                <svg width="12" height="12" viewBox="0 0 24 24">
                  <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
                  <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
            </Popconfirm>
          ) : null}
        </>
      )}
    </div>
  );
};
