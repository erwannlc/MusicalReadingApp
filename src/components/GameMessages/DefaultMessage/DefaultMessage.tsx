import { FC, useRef } from "react";

interface Props {
}

const DefaultMsgContent: FC<Props> = () => {
  const node = useRef(null as "switch" | "playBtn" | null);


  const handleHover = (element: "switch" | "playBtn" ) => {
    node.current = element;
    node.current === "switch" ? console.log("highlights switch") : console.log("highlights playBtn");
  };
  const handleLeave = () => {
    node.current === "switch" ? console.log("cancel highlights switch") : console.log("cancel highlights playBtn");
  };

  return (
    <>
    <p onMouseEnter={() => handleHover("switch")} onMouseLeave={() => handleLeave()}>
      Appuyez sur&nbsp; <span style={{fontSize:"140%", verticalAlign: "middle"}}>&#x2699;&#xfe0e;</span> &nbsp;pour afficher les options
    </p>
    <p onMouseEnter={() => handleHover("playBtn")} onMouseLeave={() => handleLeave()}>
      Appuyez sur&nbsp; <span style={{fontSize:"110%", verticalAlign: "middle"}}>&#x25B6;&#xfe0e;</span> &nbsp;pour lancer une partie !
    </p>
  </>
  )
};

export default DefaultMsgContent;