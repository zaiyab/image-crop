import React, { useEffect, useState } from "react";
import "./Slider.css";
import cn from "classnames";

export default function Slider(props) {
  let line = React.createRef();
  const [cstate, setState] = useState({
    focus: false,
    width: 0
  });
  const recalculateWidth = () => {
    line = line.current;
    if (line) {
      setState((cstate) => ({
        width: line.clientWidth
      }));
    }
  };
  const { value = 0, className } = props;
  const handleInsideDot = cstate.width
    ? Math.abs(value) <= 16 / cstate.width
    : true;
  const fillWidth = `${Math.abs(value) * 50}%`;

  const fillLeft = `${50 * (1 - Math.abs(Math.min(0, value)))}%`;

  const formattedValue = `${value > 0 ? "+" : ""}${Math.round(100 * value)}`;

  const onDrag = (e) => {
    const { onChange } = props;

    if (cstate.focus) {
      const position = "touches" in e ? e.touches[0].clientX : e.clientX;
      line = line.current;
      if (line) {
        const { left, width } = line.getBoundingClientRect();

        if (onChange) {
          onChange(
            Math.max(
              -1,
              Math.min(1, (2 * (position - left - width / 2)) / width)
            )
          );
        }
      }
      if (e.preventDefault) {
        e.preventDefault();
      }
    }
  };
  const onStop = () => {
    setState((cstate) => ({
      focus: false
    }));
  };
  const onStart = (e) => {
    setState((cstate) => ({
      focus: true
    }));
    onDrag(e);
  };
  useEffect(() => {
    window.addEventListener("resize", recalculateWidth);
    window.addEventListener("orientationchange", recalculateWidth);
    window.addEventListener("mouseup", onStop, { passive: false });
    window.addEventListener("mousemove", onDrag, { passive: false });
    window.addEventListener("touchmove", onDrag, { passive: false });
    window.addEventListener("touchend", onStop, { passive: false });
    line = line.current;
    if (line) {
      line.addEventListener("mousedown", onStart);
      line.addEventListener("touchstart", onStart);
    }
    recalculateWidth();

    return () => {
      window.removeEventListener("mouseup", onStop);
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("touchmove", onDrag);
      window.removeEventListener("touchend", onStop);

      window.removeEventListener("resize", recalculateWidth);
      window.removeEventListener("orientationchange", recalculateWidth);

      line = line.current;
      if (line) {
        line.removeEventListener("mousedown", onStart);
        line.removeEventListener("touchstart", onStart);
      }
    };
  }, []);

  return (
    <div className={cn("image-editor-slider", className)} ref={this.line}>
      <div className="image-editor-slider__line">
        <div
          className="image-editor-slider__fill"
          style={{
            width: fillWidth,
            left: fillLeft
          }}
        />
        <div className="image-editor-slider__dot" />
        <div
          className={cn(
            "image-editor-slider__value",
            handleInsideDot && "image-editor-slider__value--hidden"
          )}
          style={{
            left: `${Math.abs(value * 50 + 50)}%`
          }}
        >
          {formattedValue}
        </div>
        <div
          className={cn(
            "image-editor-slider__handler",
            cstate.focus && "image-editor-slider__handler--focus",
            handleInsideDot && "image-editor-slider__handler--hidden"
          )}
          style={{
            left: `${value * 50 + 50}%`
          }}
        />
      </div>
    </div>
  );
}
