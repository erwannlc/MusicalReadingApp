import { type FC, useState } from "react";
import Knob from "../ui/Knob/Knob";
import "./style.scss";

interface Props {
  changeLevel: (level: string, levelNum: number) => void
};

const LevelKnob: FC<Props> = ({
  changeLevel
}) => {
  const [value, setValue] = useState(2);

  const numTicks = 5;
  const max = 6;
  const degrees = 120;
  const hslBaseColor = 37;

  const onChange = (newValue: number) => {
    setValue(newValue);
  };

  const onKnobRelease = (newvalue: number) => {
    const notZeroValue = newvalue === 0 ? 1 : newvalue;
    const level: string = `level${notZeroValue}`;
    changeLevel(level, newvalue);
  };

  return (
    <div key="levelKnob" className="knob-dial">
      <Knob
        size={50}
        numTicks={numTicks}
        degrees={degrees}
        min={1}
        max={max}
        value={value}
        color={true}
        hslBaseColor={hslBaseColor}
        onChange={onChange}
        forceCurrentDegrees = {false}
        onKnobRelease={onKnobRelease}
      />
    </div>
  );
};

export default LevelKnob;
