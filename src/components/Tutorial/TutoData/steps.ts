import type { CSSPropertiesWithVars } from "../../../types/CSSPropertiesWithVars";
import type { HighLights, Disabling, Nodes } from "./nodesToHighLight";
import type { Options } from "../../../types/Options";
import type { ChangeButton } from "../../../types/TutoTypes";

type Pointer = "none" | "toUp-left" | "toUp-right" | "toLeft" | "toRight" | "toDown";

export type Steps = {
  id: string
  title: string
  content: string 
  contentMobile?: string 
  pointer?: Pointer 
  styling?: CSSPropertiesWithVars 
  highlights?: HighLights
  above?: boolean 
  listener?: string
  func?: (changeButton: ChangeButton, options: Options, nodes: Nodes, ) => void
  isOptionsOpen?: boolean
  isTableContents?: boolean
  beginPlayStep?: boolean
  beginAdvancedOptions?: boolean
  startTutoAutoPlay?: boolean
  backToZero?: boolean
  disable?: Disabling
}[];

export const steps: Steps = [
  {
    id: "step00",
    title: "",
    content: ``,
    styling: {
      height: "75vh",
      top: "2rem",
      opacity: 1,
      transition: "none"
    },
    isTableContents: true
  },
  {
    id: "step01",
    title: "Bienvenue dans ce tutoriel",
    content: `Cette application a pour objectif \nd'améliorer la justesse et la rapidité\nde la lecture de notes et donc du déchiffrage de partition.\n\n Cliquez sur "Suivant"`,
    pointer: "none",
    styling: {
      height: "17rem",
      top: "10rem"
    },
    disable: ["playBtn", "switchOptions", "optionsIndicator"],
    backToZero: true
  },
  {
    id: "step02",
    title: "Les options",
    content: `Avant de lancer une partie, jetons un oeil aux options.\nPour savoir comment accéder aux options, cliquez sur "Suivant".`,
    pointer: "toUp-left",
    styling: {
      height: "13rem",
      "--pointer-left": "40%"
    },
    highlights: "optionsIndicator",
    disable: ["playBtn", "switchOptions", "optionsIndicator"],
  },
  {
    id: "step03",
    title: "Ouvrir le panneau options",
    content: "Pour accéder aux options, cliquez sur le bouton de réglages.",
    pointer:"toUp-right",
    styling: {
      height: "11rem",
      "--pointer-right": "9%"
    },
    highlights: "switchOptions",
    listener: "toggleOptions",
    disable: ["playBtn"],
    func: (changeButton) => { 
      changeButton.nextButton = false;
    }, 
  },
  {
    id: "step04",
    title: "Panneau options",
    content: `Réglons le tempo et le niveau de difficulté.
              \nPour commencer, réglez le tempo sur 1\n puis le niveau sur 1.
              \nQuand vous aurez réussi, vous pourrez appuyer sur le bouton "suivant".`,
    styling: {
      top: "15rem",
      height: "20rem"
    },
    isOptionsOpen: true,
    disable: ["switchOptions"],
    func: (changeButton, options) => { 
      changeButton.prevButton = false;
      changeButton.isNextDisabled = true;
      if (options.intervalTime > 4400 && options.levelNum < 2) {
        changeButton.isNextDisabled = false;
      };
    }, 
  },
  {
    id: "step05",
    title: "Fermer le panneau options",
    content: `Cliquez sur le boutons "réglages" pour fermer le panneau des options.`,
    highlights: "switchOptions",
    pointer:"toUp-right",
    styling: {
      height: "12rem",
      "--pointer-right": "9%"
    },
    listener: "toggleOptions",
    isOptionsOpen: true,
    func: (changeButton) => { 
      changeButton.nextButton = false;
    }
  },
  {
    id: "step06",
    title: "Indicateur des options",
    content: `Voici les options choisies.\nOk, le tempo et la difficulté sont réglés sur 1.`,
    pointer: "toUp-left",
    styling: {
      "--pointer-left": "40%"
    },
    highlights:"optionsIndicator",
    disable: ["playBtn", "switchOptions", "optionsIndicator"],
    func: (changeButton) => { 
      changeButton.prevButton = false;
    }
  },
  {
    id: "step07",
    title: "Bouton Play",
    content: "Appuyez sur Play pour lancer la partie.",
    highlights:"playBtn",
    pointer: "toUp-left",
    styling: {
      "--pointer-left": "5%"
    },
    listener: "play",
    disable: ["switchOptions"],
    func: (changeButton) => {
      changeButton.nextButton = false;
    },
    backToZero: true,
    beginPlayStep: true
  },
  {
    id: "step08",
    title: "La partition",
    content: "Voici la première note à reconnaître.",
    pointer: "toDown",
    styling: {
      "--pointer-left": "12%"
    },
    above: true,
    highlights:"vexScore",
    disable: ["stopBtn", "switchOptions"],
    func: (changeButton, options, nodes) => {
      changeButton.prevButton = false;
      document.getElementById(`vf-treble-n1`)?.classList.add("visible");;
      // nodes.vexScoreOutput.node.firstElementChild?.children[1]?.classList.remove("hidden");
    }
  },
  {
    id: "step09",
    title: `Touche "Note"`,
    content: `Appuyez sur la touche qui correspond à la note affichée sur la partition.`,
    pointer:"toDown",
    styling: {
      marginTop: "-13rem",
      "--pointer-left": "56%",
    },
    above: true,
    highlights: "padGNote",
    listener: "padNote",
    disable: ["stopBtn", "switchOptions"],
    func: (changeButton) => {
      changeButton.nextButton = false;
      changeButton.prevButton = false;
    }
  },
  {
    id: "step10",
    title: `Affichage de la note jouée`,
    content: `La note que vous avez jouée, s'affiche ici !`,
    pointer:"toUp-left",
    styling: {
      top: "10rem",
      height: "10rem",
      "--pointer-left": "47%"
    },
    highlights:"messageDiv",

    disable: ["stopBtn", "switchOptions"],
    func: (changeButton) => { 
      changeButton.prevButton = false;
    }
  },
  {
    id: "step11",
    title: "Identifiez la deuxième note",
    content: "La note suivante s'affiche.\n\nAppuyez sur la touche qui correspond à la dernière note affichée !",
    pointer: "toDown",
    highlights:"padsDiv",
    styling: {
      "--pointer-left": "26%",
      marginTop: "-15rem",

    },
    above: true,
    listener: "pads",
    disable: ["stopBtn", "switchOptions", "padsDiv"],
    func: (changeButton, options, nodes) => { 
      changeButton.prevButton = false;
      changeButton.nextButton = false;
      document.getElementById(`vf-treble-n2`)?.classList.add("visible");
      // nodes.vexScoreOutput.node.firstElementChild?.children[2]?.classList.remove("hidden");
    }
  },
  {
    id: "step12",
    title: "Déroulement de la partie",
    content: `La solution apparaîtra à la fin de la partie.\n\n Il reste 3 notes pour cette partie "tutoriel".\nAppuyez sur "suivant" pour continuer la partie.\n\nLes 3 notes vont s'afficher automatiquement l'une après l'autre. \nAttention à bien gérer le temps imparti !`,
    styling: {
      "--pointer-left": "47%",
      height: "19rem",
      top: "5px"
    },
    disable: ["stopBtn", "switchOptions"],
    func: (changeButton, nodes) => { 
      changeButton.prevButton = false;
    }
  },
  {
    id: "step13", // in Tutorial, playTuto is called
    title: "",
    content: "",
    startTutoAutoPlay: true
  },
  {
    id: "step14",
    title: "Fin de la partie ! Score",
    content: "Observez votre score.\n\nSi vous avez plus de 80%, augmentez le tempo pour progresser, puis le niveau. Attention, une vraie partie dure plus longtemps ;)",
    pointer:"toRight",
    styling: {
      "--pointer-top": "34%",
      height: "15rem",
      top: "5px"
    },
    disable: ["playBtn", "switchOptions"],
    func: (changeButton) => {
      changeButton.prevButton = false;
    }
  },
  {
    id: "step15",
    title: "Fin de la partie",
    content: "Comparez vos réponses et la solution, pour identifier les erreurs. \nS'il y a des erreurs, les notes concernées apparaissent en couleur sur la partition.",
    pointer:"toUp-left",
    styling: {
      height: "13rem",
      marginTop: "12rem",
      "--pointer-left": "50%"
    },
    highlights: "messageDiv",    
    disable: ["playBtn", "switchOptions"],
  },
  {
    id: "step16",
    title: "Options avancées",
    content: `Cliquez sur "Suivant" pour continuer à explorer les options.`,
    styling: {
      height: "12rem",
      top: "8rem"
    },
    disable: ["playBtn", "switchOptions"],
    func: (changeButton) => { 
      changeButton.quitButton = true;
    },
    beginAdvancedOptions: true,
    backToZero: true
  },
  {
    id: "step17",
    title: "Panneau options",
    content: "Vous pouvez aussi ouvrir le panneau des options en cliquant ici.",
    pointer: "toUp-right",
    styling: {
      "--pointer-right": "46%"
    },
    highlights:"optionsIndicator",
    listener: "optionsIndicator",
    disable: ["playBtn"],
    func: (changeButton) => { 
      changeButton.nextButton = false;
    }
  },
  {
    id: "step18",
    title: "Clefs",
    content: `Sélectionnez "𝄞 𝄢".\n\n Deux portées vont s'afficher, l'une en clé de sol "𝄞",\net l'autre en clé de fa "𝄢".\n\nLes notes vont apparaitre, soit en clé de sol soit en clé de fa.`,
    pointer: "toUp-right",
    styling: {
      marginTop: "1rem",
      height: "18rem",
      "--pointer-right": "14rem"
    },
    highlights:"clefs",
    isOptionsOpen: true,
    disable: ["switchOptions", "switchPiano"],
    func: (changeButton, options) => {
      changeButton.isNextDisabled = true;
      changeButton.prevButton = false;
      if (options.clefSelected === "bothClefs") {
        changeButton.isNextDisabled = false;
      };
    }
  },
  {
    id: "step19",
    title: "Piano",
    content: `Cliquez sur le bouton Piano \npour afficher le mode "piano".`,
    pointer: "toUp-right",
    styling: {
      top: "13rem",
      height: "13rem",
      "--pointer-right": "5.1rem"
    },
    highlights: "switchPiano",
    listener: "switchPiano",
    isOptionsOpen: true,    
    disable: ["switchOptions"],
    func: (changeButton) => {
      changeButton.nextButton = false;
    }
  },
  {
    id: "step20",
    title: "Jouer au Piano",
    content: "Vous pouvez jouer au piano en cliquant sur les touches.\n\nEssayez aussi de jouer avec le clavier de votre ordinateur (en appuyant sur les lettres indiquées sur chaque touche du piano).\n\nActiver ou monter le son si besoin, pour entendre les notes jouées.",
    contentMobile: "Vous pouvez jouer au piano en appuyant sur les touches, même en dehors d'une partie. Activez le son si besoin.",
    pointer:"toDown",
    styling: {
      top: "10rem",
      height: "20rem",
      "--pointer-left": "50%"
    },
    disable: ["switchOptions", "playBtn"],
    func: (changeButton) => { 
      changeButton.prevButton = false;
    }
  },
  {
    id: "step21",
    title: "Jouer une partie au piano - bouton Play",
    content: "Lancez un début de partie en appuyant sur le bouton Play.",
    highlights:"playBtn",
    listener: "play",
    pointer: "toUp-left",
    styling: {
      "--pointer-left": "5%"
    },
    disable: ["switchOptions"],
    func: (changeButton) => {
      changeButton.nextButton = false;
    }
  },
  {
    id: "step22",
    title: "Piano",
    content: "Jouez la bonne note, sans tenir compte de l'octave.\n\n Dans cet exemple, vous devez jouer un do, il y a donc 2 possibilités.\n\nAppuyer sur l'un des deux 'do' du piano",
    contentMobile: "Jouez la bonne note. L'objectif est bien de lire la note, peu importe l'octave.",
    above: true,
    pointer: "toDown",
    styling: {
      "--pointer-left": "27%",
      height: "16rem",
      top: "1.5rem"
    },
    listener: "notesOnPiano",
    highlights: "bothOctavesNote",
    disable: ["switchOptions"],
    func: (changeButton, options, nodes) => {
      changeButton.nextButton = false;
      changeButton.prevButton = false;
      document.getElementById("vf-treble-n1")?.classList.add("visible");
      document.getElementById("vf-bass-n1")?.classList.add("visible");
      document.getElementById("vf-treble-n2")?.classList.add("visible");
      document.getElementById("vf-bass-n2")?.classList.add("visible");
      // const children = nodes.vexScoreOutput.node.firstElementChild?.children;
      // if (options.clefSelected === "treble" || options.clefSelected === "bass") {
      //   children && children[1]?.classList.remove("hidden");
      //   children && children[2]?.classList.remove("hidden");
      // } else {
      //   children && children[2]?.classList.remove("hidden"); // vf-treble-n1
      //   children && children[8]?.classList.remove("hidden"); // vf-bass-n2
      // };
    }
  },
  {
    id: "step23",
    title: "Quitter une partie",
    content: `Ok ! Maintenant nous allons voir comment quitter une partie en cours.\n\nAppuyez sur le bouton "stop"\n pour interrompre et quitter la partie en cours.`,
    listener: "stop",
    pointer:"toUp-left",
    highlights:"stopBtn",
    styling: {
      "--pointer-left": "12%",
      height: "15rem",
      marginTop: "2rem"
    },
    disable: ["switchOptions"],
    func: (changeButton) => { 
      changeButton.nextButton = false;
      changeButton.prevButton = false;
    }
  },
  {
    id: "step24",
    title: `Quitter le mode "piano"`,
    content: `Dernière étape : \nPour quitter le mode "piano", ouvrez le panneau "options"\n en appuyant sur le bouton "réglages"...`,
    pointer: "toUp-right",
    styling: {
      "--pointer-right": "9%",
      height: "14rem",
      marginTop: "2rem"
    },
    highlights: "switchOptions",
    listener: "toggleOptions",
    disable: ["playBtn"],
    func: (changeButton) => { 
      changeButton.nextButton = false;
      changeButton.prevButton = false;
    }
  },
  {
    id: "step25",
    title: `Quitter le mode "piano"`,
    content: `... et rappuyez sur le bouton "piano`,
    pointer: "toUp-right",
    styling: {
      height: "13rem",
      "--pointer-right": "5.1rem"
    },
    highlights: "switchPiano",
    listener: "switchPiano",
    isOptionsOpen: true,
    disable: ["switchOptions"],
    func: (changeButton) => { 
      changeButton.nextButton = false;
      changeButton.prevButton = false;
    },
  },
  {
    id: "step26",
    title: "Fin du tutoriel",
    content: "Bravo ! Vous avez fini le tutoriel.\n\n Maintenant, place au jeu !",
    styling: {
      height: "14rem",
      top: "5px"
    },
    disable: ["switchOptions", "playBtn"],
    func: (changeButton) => { 
      changeButton.changeNextToQuit = true;
      changeButton.nextButton = false;
      changeButton.prevButton = false;
    },
    backToZero: true
  },
];
