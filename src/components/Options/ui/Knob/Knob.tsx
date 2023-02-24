import React, { type FC, useState, useRef } from "react";

interface KnobProps {
  size: number
  numTicks: number
  degrees: number
  min: number
  max: number
  value: number
  color: boolean
  hslBaseColor: number
  onChange: (newValue: number) => void
  forceCurrentDegrees: false | number
  onKnobRelease: (newValue: number) => void
}

const Knob: FC<KnobProps> = (props) => {
  const {
    size,
    numTicks,
    degrees,
    min,
    value,
    max,
    color,
    hslBaseColor,
    onChange,
    forceCurrentDegrees,
    onKnobRelease
  } = props;

  const fullAngle = degrees;
  const startAngle = (360 - degrees) / 2;
  const endAngle = startAngle + degrees;
  const margin = size * 0.15;

  const convertRange = (
    oldMin: number,
    oldMax: number,
    newMin: number,
    newMax: number,
    oldValue: number
  ): number =>
    (oldValue - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin;

  let currentDeg: number = forceCurrentDegrees ||
    Math.floor(convertRange(min, max, startAngle, endAngle, value));

  const [deg, setDeg] = useState(currentDeg);

  const newValue = useRef<number>(value);

  const getDeg = (cX: number, cY: number, pts: { x: number, y: number }) => {
    const x = cX - pts.x;
    const y = cY - pts.y;
    let deg = Math.atan(y / x) * 180 / Math.PI;
    if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
      deg += 90;
    } else {
      deg += 270;
    }
    const finalDeg = Math.min(Math.max(startAngle, deg), endAngle);
    return finalDeg;
  };

  const renderTicks = () => {
    const ticks = [];
    const incr = fullAngle / numTicks;
    const newSize = margin + size / 2;
    for (let deg = startAngle; deg <= endAngle; deg += incr) {
      const tick = {
        deg,
        tickStyle: {
          height: newSize + 10,
          left: newSize - 1,
          top: newSize + 2,
          transform: `rotate(${deg}deg)`,
          transformOrigin: "top"
        }
      };
      ticks.push(tick);
    }
    return ticks;
  };

  const moveHandler = (
    clientX: number,
    clientY: number,
    pts: { x: number, y: number }
  ): void => {
    currentDeg = getDeg(clientX, clientY, pts);
    if (currentDeg === startAngle) currentDeg--;

    let calcValue: number = Math.floor(
      convertRange(
        startAngle,
        endAngle,
        min,
        max,
        currentDeg
      )
    );
    if (calcValue === 0) calcValue = 1;
    if (calcValue !== value) onChange(calcValue);
    newValue.current = calcValue;
    setDeg(currentDeg);
  };
  // prevent onMouseDown to trigger after touchstart
  const prevent = useRef(false);
  const ptsRef = useRef<{
    x: number
    y: number
  }>({ x: 0, y: 0 });

  const touchGrapHandler = (e: TouchEvent) => {
    moveHandler(e.touches[0].clientX, e.touches[0].clientY, ptsRef.current);
  };
  const mouseGrapHandler = (e: MouseEvent) => {
    moveHandler(e.clientX, e.clientY, ptsRef.current);
  };

  const startDragTouch = (e: React.TouchEvent) => {
    prevent.current = true;
    const knob = e.currentTarget.getBoundingClientRect();
    ptsRef.current = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2
    };
    document.addEventListener("touchmove", touchGrapHandler);
    document.addEventListener("touchend", stopDrag);
  };
  const startDrag = (e: React.MouseEvent) => {
    if (prevent.current) {
      prevent.current = false;
    } else {
      e.preventDefault();
      const knob = e.currentTarget.getBoundingClientRect();
      ptsRef.current = {
        x: knob.left + knob.width / 2,
        y: knob.top + knob.height / 2
      };
      document.addEventListener("mousemove", mouseGrapHandler);
      document.addEventListener("mouseup", stopDrag);
    };
  };

  const stopDrag = () => {
    document.removeEventListener("touchmove", touchGrapHandler);
    document.removeEventListener("mousemove", mouseGrapHandler);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchend", stopDrag);
    onKnobRelease(newValue.current);
  };

  interface KStyle {
    width: number
    height: number
  };

  const dcpy = (o: KStyle) => JSON.parse(JSON.stringify(o));

  const kStyle = {
    width: size,
    height: size
  };
  const iStyle = dcpy(kStyle);
  const oStyle = dcpy(kStyle);
  oStyle.margin = margin;
  if (color) {
    oStyle.backgroundImage =
    `radial-gradient(100% 70%,hsl(${hslBaseColor},
       ${currentDeg}%,
        ${currentDeg / 5}%),
        hsl(${Math.random() * 100},
        20%,${currentDeg / 36}%))`;
  };
  iStyle.transform = `rotate(${deg}deg)`;

  return (
    <div className="knob" style={kStyle}>
      <div className="ticks">
        {numTicks
          ? renderTicks().map((tick, i) => (
            <div
              key={i}
              className={
                // first tick (=== 0) always active
                "tick" + (
                  tick.deg <= currentDeg
                    ? " active"
                    : i === 0
                      ? " active"
                      : ""
                )
              }
              style={tick.tickStyle}
            />
          ))
          : null}
      </div>
      <div
        className="knob outer"
        style={oStyle}
        onMouseDown={startDrag}
        onTouchStart={startDragTouch}>
        <div className="knob inner" style={iStyle}>
          <div className="grip" />
        </div>
      </div>
    </div>
  );
};

export default Knob;
