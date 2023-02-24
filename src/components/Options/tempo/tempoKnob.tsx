import { type FC, useState } from "react";
import Knob from "../ui/Knob/Knob";
import "./style.scss";

interface Props {
  changeTimer: (interval: number, tempoNum: number) => void
  tempoNum: number
};

const TempoKnob: FC<Props> = ({
  changeTimer,
  tempoNum
}) => {
  const [value, setValue] = useState(tempoNum);

  const forceCurrentDegrees = tempoNum === 1 ? 95 : false;

  const numTicks = 10;
  const max = 11;
  const degrees = 180;
  const hslBaseColor = 210;

  const onChange = (newValue: number) => {
    setValue(newValue);
  };

  const onKnobRelease = (newvalue: number) => {
    const interval: number =
    newvalue > 0 && newvalue < 5
      ? 500 * (5 - newvalue) + 2500
      : newvalue > 5
        ? 300 * (10 - newvalue) + 1000
        : newvalue === 5
          ? 2500
          : 5000;
    changeTimer(interval, newvalue);
  };

  return (
    <div key="tempoKnob" className="knob-dial">
      <Knob
        size={50}
        numTicks={numTicks}
        degrees={degrees}
        min={1}
        max={max}
        value={value}
        color={true}
        onChange={onChange}
        hslBaseColor={hslBaseColor}
        forceCurrentDegrees = {forceCurrentDegrees}
        onKnobRelease={onKnobRelease}
      />
    </div>
  );
};

export default TempoKnob;
