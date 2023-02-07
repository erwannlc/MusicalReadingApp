import { FC, useRef } from "react";
import "./answers-msg.scss";

type Props = {
  answers: string[],
  lastValue: string
};

const AnswersMsg:FC<Props> = ({answers, lastValue}) => {
  const count = useRef(1); // allow NotePlayed to animate itself at each render
  count.current++;
  return  (
      <div className="answers-msg">
        <div className="table-wrapper">
          <table className="last-answers" aria-label="User's answers">
            <tbody>
              <tr className="answers notes">
                {answers.map((answer, i) => 
                  <td className="answers" key={answer + i}>{answer}</td>
                  )}
              </tr>
            </tbody>
          </table>
        </div>
        <NotePlayed value={lastValue} id={count.current.toString()}/>
      </div>
    )
  }

export default AnswersMsg;

const NotePlayed:FC<{value: string, id: string}> = ({value, id}) => {
  return ( 
    <p className={`note-played`} key={id}>{value}</p>
  )
};