import React from "react";
import "./Button.css";
import cn from "classnames";

export default function Button({ className, active, children, ...props }) {
  return (
    <button
      className={cn(
        "image-editor-button",
        active && "image-editor-button--active",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
