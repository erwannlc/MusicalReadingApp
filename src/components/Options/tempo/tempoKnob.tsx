import {FC, useEffect, useState} from "react";
import Knob from "../ui/Knob/Knob";
import "./style.scss";


interface Props {
  handleFunc: (value: number) => void
  tempoNum: number,
  numTicks: number,
  max: number, 
  degrees: number,
  hslBaseColor: number
};

const KnobButton: FC<Props> = ({handleFunc, tempoNum, numTicks, max, degrees, hslBaseColor}) => {
  const [value, setValue] = useState(tempoNum);
  const [forceCurrentDegrees, setForceDeg] = useState(false as false | number);
  
  useEffect(() => {
    setValue(tempoNum);
    if (tempoNum === 1) setForceDeg(95);
  }, [tempoNum]);

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
          setValue={setValue}
          hslBaseColor={hslBaseColor}
          forceCurrentDegrees = {forceCurrentDegrees}
        />
      </div>
    );
}

export default KnobButton;

