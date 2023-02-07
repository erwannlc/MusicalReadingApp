import { FC } from "react";
import { CorrectionTD } from "../../../types/MessageObj";
import "./correction.scss";

type CorrectionProps = {
  answersTD: CorrectionTD,
  solutionTD: CorrectionTD,
  gameLength: number
};

const CorrectionTable: FC <CorrectionProps> = ({answersTD, solutionTD, gameLength}) => {


  return (
    <table className="correction" aria-label="Answers and solution">
      {/* <caption>Answers and solution</caption> */}
      <tbody>
        <tr className="title">
          <th colSpan={gameLength}>Mes réponses :</th>
        </tr>
        <tr className="answers notes">
        {answersTD.map(answer => 
          <td className={answer.className} key={answer.id}>{answer.content}</td>
          )}
        </tr>
        <tr className="title">
          <th colSpan={gameLength}>Solution :</th>
        </tr>
        <tr className="solution notes">
        {solutionTD.map(solution => 
          <td className={solution.className} key={solution.id}>{solution.content}</td>
          )}
        </tr>
       </tbody>
    </table>
  );
};

export default CorrectionTable;