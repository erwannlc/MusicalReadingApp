import { type FC } from "react";
import "./loader.css";

interface Props {
  loaderClassName?: string
}

const Loader: FC<Props> = ({ loaderClassName }) => (
    <main className={loaderClassName ?? "main-loader"}>
      <span className="loader"></span>
      {/* <p className="loader-txt"> Chargement en cours...</p> */}
    </main>
);

export default Loader;
