import CorrectionTable from "../components/GameMessages/Correction";
import type { ClefSelected } from "../types/Clefs";
import { MessageObj, CorrectionTD } from "../types/MessageObj";

let scoreNumber: number = 0;

export const handleAnswers = async (
  solution: string[], 
  answers: string[], 
  scaleA: {[key: string]: string},
  resetAnswers: () => void,
  handleMessage: (message: MessageObj) => void,
  isMobile: boolean,
  gameLength: number,
  displayScoreCircle: (score: number) => void,
  vexScoreNode: HTMLElement,
  appNode: HTMLElement | null,
  outputNode: HTMLElement,
  clefSelected: ClefSelected,
  notesIndex?: number[]
  ) => {
    let answersTD: CorrectionTD = [];
    let solutionTD: CorrectionTD = [];
    scoreNumber= 0;

    const generateCorrection = async () => { 
      const props = {
        answersTD: answersTD,
        solutionTD: solutionTD,
        gameLength: gameLength
      };
      const correctionMsg: MessageObj = {
          className: "answers",
          content: <CorrectionTable {...props}/>,
          isModal: isMobile ? true : false,
          modal: {content: <CorrectionTable {...props}/>,  className: "answers"}
      };
      if (isMobile) {
        appNode?.classList.add("while-correction");
        vexScoreNode.classList.add("while-correction");
      };
      handleMessage(correctionMsg);
    };
    
    const gameScore = async () => {
      for (let i=0; i<gameLength; i++) {
        const solutionNote = solution[i];
        const answer = answers[i];
        if (answer === solutionNote) scoreNumber++;
        if (!isMobile && answer !== solutionNote) {
          switch (clefSelected) {
            case "treble": 
            case "bass": outputNode?.firstElementChild?.children[(i + 1)].classList.add("wrongNote");
              break;
            case "bothClefs": 
              if (notesIndex) {
                const noteIndex = notesIndex[i]
                outputNode?.firstElementChild?.children[noteIndex].classList.add("wrongNote");
              }
             break;
          };
        };
        let className: string = answer === solutionNote ? "correct" : "wrong";
        const answerID = "answer"+i;
        const answerTxt = answer === "?" ? "?" : scaleA[answer];
        const solutionID = "solution"+i;
        answersTD.push({id: answerID, className: className, content: answerTxt});
        solutionTD.push({id: solutionID, className: className, content: scaleA[solutionNote]});
      };
    };
    gameScore()
    .then(() => generateCorrection())
    .then(() => displayScoreCircle(scoreNumber))
    .then(() => resetAnswers());
};


export const handleError = async (
  resetAnswer: () => void,
  handleMessage: (message: MessageObj) => void,
  errorType: "noAnswer" | "incompleteAnswer"
  ) => {
  let errorMsg: MessageObj;
  const writeErrorMsg = async () => {
    if (errorType === "noAnswer") {
      errorMsg = {content: <>
        <p className="error-title">Aucune réponse enregistrée.</p>
          <p>Pendant la partie, appuyez sur la note qui correspond à la note affichée sur la partition.</p></>
        , className: "answers error"};
    }
    else if (errorType === "incompleteAnswer") {
      errorMsg = {content: <>
        <p className="error-title">Réponse incomplète.</p>
        <p>Ralentissez le tempo pour pouvoir identifier toutes les notes.</p></>
        , className: "answers error"};
    };
  }; 
  writeErrorMsg()
  .then(() => handleMessage(errorMsg))
  .then(() => resetAnswer());
};
