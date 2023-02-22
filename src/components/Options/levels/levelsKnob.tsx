import { type FC, useEffect, useState } from "react";
import Knob from "../ui/Knob/Knob";
import "./style.scss";

interface Props {
  handleFunc: (value: number) => void
  numTicks: number
  max: number
  degrees: number
  hslBaseColor: number
};

const KnobButton: FC<Props> = ({ handleFunc, numTicks, max, degrees, hslBaseColor }) => {
  const [value, setValue] = useState(2);

  useEffect(() => {
    handleFunc(value);
  }, [handleFunc, value]);

  return (
    <div className="knob-dial">
      <Knob
        size={50}
        numTicks={numTicks}
        degrees={degrees}
        min={1}
        max={max}
        value={value}
        color={true}
        hslBaseColor={hslBaseColor}
        setValue={setValue}
        forceCurrentDegrees = {false}
      />
    </div>
  );
};

export default KnobButton;
