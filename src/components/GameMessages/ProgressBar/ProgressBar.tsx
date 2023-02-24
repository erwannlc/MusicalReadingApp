import { type FC } from "react";
import type { CSSPropertiesWithVars }
  from "./../../../types/CSSPropertiesWithVars";
import "./progressbar.scss";

const ProgressBar: FC<{
  tempoTime: number
  id: string
  gameLength: number
}> = ({ tempoTime, id, gameLength }) => {
  let duration = tempoTime;
  if (parseInt(id) === gameLength) {
    duration = tempoTime * 2;
  };
  const styling: CSSPropertiesWithVars = {
    "--tempo-time": `${duration / 1000}s`
  };
  return (
    <div className="play-progressbar" key={id}>
      <span className="progress" style={styling}></span>
    </div>
  );
};

export default ProgressBar;
