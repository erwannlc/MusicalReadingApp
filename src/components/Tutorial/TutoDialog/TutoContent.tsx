import { FC } from "react";
import CloseBtn from "./ui/btn_close";
import type { ChangeButton } from "../../../types/TutoTypes";


type Props = {
  handleClose: () => void
  steps: {title: string, content: string}[]
  goNext: () => void
  goPrev: () => void
  goToStep: (newStep: number) => void
  stepIndex: number
  changeButton: ChangeButton
  isTableContents: boolean
  backToZero: boolean 
};


const TutoContent: FC<Props> = ({handleClose, steps, goNext, goPrev, goToStep, stepIndex, changeButton, isTableContents, backToZero}) => {

  const  {isNextDisabled, nextButton, prevButton, quitButton, changeNextToQuit } = changeButton;

  const Message: FC = () => {
    const actualMsg = steps[stepIndex]
    return (
      <div className="tuto-msg">
        <header>
          {/* <h4>Tutoriel {stepIndex + 1}</h4> // for dev */}
          {actualMsg.title && <h4 className="msg-title">{actualMsg.title}</h4>}
        </header>
        <p>{actualMsg.content}</p>
      </div>
    )
  };

  const TableOfContents: FC = () => {
    const tableOfContentsData = {
      title: "Bienvenue dans ce tutoriel !",
      title2: "Sommaire",
      p: `Cette application a pour objectif d'améliorer\n la justesse et la rapidité de la lecture de notes.`,
      chapter: {
        1: "1 - Découvrir comment changer la vitesse et la difficulté",
        2: "2 - Comment jouer une partie",
        3: "3 - Autres options : clefs, mode piano"
      }
    };
    const { title, title2, p, chapter } = tableOfContentsData;
    return (
      <div className="tuto-msg table-of-contents">
      <header>
        <h4 className="msg-title">
          {title}
        </h4>
      </header>
      <main>
        <p>{p}</p>
        <h4 className="title2">
            {title2}
          </h4>
        <ul className="ul-table">
          <li className="chapter" onClick={() => goToStep(1)}>{chapter[1]}</li>
          <li className="chapter" onClick={() => goToStep(7)}>{chapter[2]}</li>
          <li className="chapter" onClick={() => goToStep(16)}>{chapter[3]}</li>
        </ul>
      </main>
    </div>
    )
  };

  const NextOrQuitButton: FC = () => {
    return (
      nextButton ? <button className="nav next" onClick={goNext} disabled={isNextDisabled}>Suivant</button> 
      : changeNextToQuit ? <button className="nav next" onClick={handleClose} disabled={isNextDisabled}>Quitter</button> 
      : null
    )
  };
  const QuitButton: FC = () => {
    return (
      quitButton ? <button className="nav quit" onClick={handleClose} disabled={isNextDisabled}>Quitter</button> : null
    )
  };
  const PreviousButton: FC = () => {
    const backToZeroText= "Revenir au sommaire"
    if (backToZero) {
      return (
        <button className="nav prev" onClick={() => goToStep(0)}>{backToZeroText}</button>
      )
    } else return (
      prevButton ? <button className="nav prev" onClick={goPrev}>Précédent</button> : null
    )
  };

  if (isTableContents) {
    return (
      <>
        <TableOfContents />
        <CloseBtn closeBtnClassName="close" handleClose={handleClose}/>
      </>
    )
  } else return (
    <>
      <Message />
      <PreviousButton />
      <QuitButton />
      <NextOrQuitButton />
      <CloseBtn closeBtnClassName="close" handleClose={handleClose}/>
    </>
  )
};

export default TutoContent;