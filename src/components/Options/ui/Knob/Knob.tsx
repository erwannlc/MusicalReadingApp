import React, {FC, useEffect, useState} from "react";

type KnobProps = {
  size: number,
  numTicks: number, 
  degrees: number,
  min: number,
  max: number,
  value: number, 
  color: boolean,
  hslBaseColor: number,
  setValue: React.Dispatch<React.SetStateAction<number>>,
  forceCurrentDegrees: false | number
};
  
const Knob: FC<KnobProps>= (props) => {
  const {size, numTicks, degrees, min, value, max, color, hslBaseColor, setValue, forceCurrentDegrees} = props;

  let fullAngle = degrees;
  let startAngle = (360 - degrees) /2;
  let endAngle = startAngle + degrees;
  let margin = size * 0.15;
  
  const convertRange = (oldMin: number, oldMax: number, newMin: number, newMax: number, oldValue: number): number => {
    return (oldValue - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin;
  };
  
  let currentDeg: number = Math.floor(convertRange(min, max, startAngle, endAngle, value));

  const [deg, setDeg] = useState(currentDeg);
  useEffect(() => {
    if (forceCurrentDegrees) setDeg(forceCurrentDegrees);
  }, [forceCurrentDegrees])

  const getDeg = (cX: number, cY: number, pts: {x: number, y: number}) => {
    const x = cX - pts.x;
    const y = cY - pts.y;
    let deg = Math.atan(y / x) * 180 / Math.PI;
    if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
      deg += 90;
    } else {
      deg += 270;
    }
    let finalDeg = Math.min(Math.max(startAngle, deg), endAngle);
    return finalDeg;
  };

  const renderTicks = () => {
    let ticks = [];
    const incr = fullAngle / numTicks;
    const newSize = margin + size / 2;
    for (let deg = startAngle; deg <= endAngle; deg += incr) {
      const tick = {
        deg: deg,
        tickStyle: {
          height: newSize + 10,
          left: newSize - 1,
          top: newSize + 2,
          transform: "rotate(" + deg + "deg)",
          transformOrigin: "top"
        }
      };
      ticks.push(tick);
    }
    return ticks;
  };

  const moveHandler = (clientX: number, clientY: number, pts: {x: number, y: number}): void => {
    currentDeg = getDeg(clientX, clientY, pts);
    if (currentDeg === startAngle) currentDeg--;

    let newValue: number= Math.floor(
      convertRange(
        startAngle,
        endAngle,
        min,
        max,
        currentDeg
      )
    );
    if (newValue === 0) newValue = 1;
    setDeg(currentDeg);
    setValue(newValue);
  };      

  const startDragTouch = (e: React.TouchEvent ) => {
    const knob = e.currentTarget.getBoundingClientRect();
    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2
    };
    const grapHandler = (e: TouchEvent) => {
      moveHandler(e.touches[0].clientX, e.touches[0].clientY, pts);
    };
    document.addEventListener("touchmove", grapHandler);
    document.addEventListener("touchend", e => {
      document.removeEventListener("touchmove", grapHandler);
    });
  }
  const startDrag = (e: React.MouseEvent )=> {
    e.preventDefault();
    const knob = e.currentTarget.getBoundingClientRect();
    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2
    };
    const grapHandler = (e: MouseEvent) => moveHandler(e.clientX, e.clientY, pts);
    document.addEventListener("mousemove", grapHandler);
    document.addEventListener("mouseup", e => {
      document.removeEventListener("mousemove", grapHandler);
    });
  };

  interface KStyle {
    width: number, height: number
  }

  const dcpy = (o: KStyle) => {
    return JSON.parse(JSON.stringify(o));
  };

  let kStyle = {
    width: size,
    height: size
  };
  let iStyle = dcpy(kStyle);
  let oStyle = dcpy(kStyle);
  oStyle.margin = margin;
  if (color) {
    oStyle.backgroundImage =
    `radial-gradient(100% 70%,hsl(${hslBaseColor}, ` +
    currentDeg +
    "%, " +
    currentDeg / 5 +
    "%),hsl(" +
    Math.random() * 100 +
    ",20%," +
    currentDeg / 36 +
    "%))";
  };
  iStyle.transform = "rotate(" + deg + "deg)";

  return (
    <div className="knob" style={kStyle}>
        <div className="ticks">
            {numTicks
                ? renderTicks().map((tick, i) => (
                    <div
                      key={i}
                      className={
                        "tick" + (tick.deg <= currentDeg ? " active" : i === 0 ? " active" : "") // first tick (=== 0) always active
                      }
                      style={tick.tickStyle}
                    />
                  ))
                : null}
            </div>
            <div className="knob outer" style={oStyle} onMouseDown={startDrag} onTouchStart={startDragTouch}>
              <div className="knob inner" style={iStyle}>
                <div className="grip" />
              </div>
        </div>
      </div>
  )
}

export default Knob;

