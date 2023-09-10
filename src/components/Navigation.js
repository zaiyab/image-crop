import React, { useRef } from "react";
import cn from "classnames";

import "./Navigation.css";
import Button from "./Button";
import UploadIcon from "../icons/UploadIcon";
import CropIcon from "../icons/CropIcon";
import SaturationIcon from "../icons/SaturationIcon";
import BrightnessIcon from "../icons/BrightnessIcon";
import ContrastIcon from "../icons/ContrastIcon";
import HueIcon from "../icons/HueIcon";
import DownloadIcon from "../icons/DownloadIcon";
export default function Navigation({
  className,
  onChange,
  onUpload,
  onDownload,
  mode
}) {
  const setMode = (mode) => () => {
    onChange?.(mode);
  };

  const inputRef = useRef(null);

  const onUploadButtonClick = () => {
    inputRef.current?.click();
  };

  const onLoadImage = (event) => {
    const { files } = event.target;

    // Ensure that you have a file before attempting to read it
    if (files && files[0]) {
      if (onUpload) {
        onUpload(URL.createObjectURL(files[0]));
      }
    }
    // Clear the event target value to give the possibility to upload the same image:
    event.target.value = "";
  };
  return (
    <div className={cn("image-editor-navigation", className)}>
      <Button
        className={"image-editor-navigation__button"}
        onClick={onUploadButtonClick}
      >
        <UploadIcon />
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onLoadImage}
          className="image-editor-navigation__upload-input"
        />
      </Button>
      <div className="image-editor-navigation__buttons">
        <Button
          className={"image-editor-navigation__button"}
          active={mode === "crop"}
          onClick={setMode("crop")}
        >
          <CropIcon />
        </Button>
        <Button
          className={"image-editor-navigation__button"}
          active={mode === "saturation"}
          onClick={setMode("saturation")}
        >
          <SaturationIcon />
        </Button>
        <Button
          className={"image-editor-navigation__button"}
          active={mode === "brightness"}
          onClick={setMode("brightness")}
        >
          <BrightnessIcon />
        </Button>
        <Button
          className={"image-editor-navigation__button"}
          active={mode === "contrast"}
          onClick={setMode("contrast")}
        >
          <ContrastIcon />
        </Button>
        <Button
          className={"image-editor-navigation__button"}
          active={mode === "hue"}
          onClick={setMode("hue")}
        >
          <HueIcon />
        </Button>
      </div>
      <Button
        className={"image-editor-navigation__button"}
        onClick={onDownload}
      >
        <DownloadIcon />
      </Button>
    </div>
  );
}
