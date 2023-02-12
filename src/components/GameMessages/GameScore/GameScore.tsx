import { FC } from "react";
import "./game-score.scss";
// Thx to Javier Delgado https://github.com/javiluli
// https://codepen.io/alvarotrigo/pen/VwMvydQ

interface Props {
  isModal: boolean
  scoreNumber: number
  gameLength: number
  isMobile: boolean
};

const getScoreColor = (score: number): string => {
  const colors = {
    A: "#55ff33",
    B: "#daff33",
    C: "#ffe433",
    D: "#ff7e33",
    E: "#ff3333",
  };
  return score > 80 ? colors.A : score > 60 ? colors.B  : score > 40 ? colors.C  : score > 20 ? colors.D : colors.E ;
};

const GameScore: FC<Props> = ({isModal, scoreNumber, gameLength, isMobile}) => {

  let scoreTxt = "Score";
  let className = {
    gameScore: "hide",
    scoreCircle: "progressbar__svg-circle shadow-node",
    scoreTxt: "progressbar__text shadow-node"
  };

  if (scoreNumber >= 0) {
    const scoreDashOffset = scoreNumber === gameLength ? 0 : 320 * +((gameLength-scoreNumber)/gameLength).toFixed(1);
    document.documentElement.style.setProperty("--score-dashoffset", scoreDashOffset.toString());
    className.scoreCircle = "progressbar__svg-circle shadow-node  circle-node";
    const scorePercent: string = (scoreNumber*100/gameLength).toFixed(0);
    scoreTxt = `${scorePercent} %`;
    const scoreColor = getScoreColor(+scorePercent);
    document.documentElement.style.setProperty("--score-color", scoreColor);
    className.scoreTxt = "progressbar__text shadow-node display";
    className.gameScore = "";
    if (isMobile && !isModal) className.gameScore = "hide";
  };



  return (
    <div id="game-score" className={className.gameScore}>
      <div className="score-container">
        <div className="score-container__progressbars">
          <div className="progressbar">
            <svg className="progressbar__svg">
              <circle cx="55" cy="55" r="50" id="scoreCircle" className={className.scoreCircle}> </circle>
              {/* <circle cx="80" cy="80" r="70" id="scoreCircle" className="progressbar__svg-circle shadow-node"> </circle> */}
            </svg>
            <span className={className.scoreTxt}>{scoreTxt}</span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default GameScore;