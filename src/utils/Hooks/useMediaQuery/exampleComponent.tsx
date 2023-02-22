import { type FC } from "react";
import useMediaQuery from "./useMediaQuery";
// https://codesandbox.io/s/elastic-tdd-c85hr?from-embed=&file=/src/App.tsx:109-952

export const Example: FC = () => {
  const [userSetQuery, setUserSetQuery] = useMediaQuery(
    "screen and (max-width: 767px)"
  );
  const [isSmallScreen] = useMediaQuery("screen and (max-width: 767px)");
  const [isTouchScreen] = useMediaQuery(
    "screen and (hover: none) and (pointer: coarse)"
  );

  return (
    <div className="App">
      <h1>Medial Query Examples</h1>
      <h2>Below are the results of the media queries</h2>
      <p>isSmallScreen: {isSmallScreen.toString()}</p>
      <p>isTouchScreen: {isTouchScreen.toString()}</p>
      <hr />
      <h2>Queries can be programitically updated at any point</h2>
      <input
        defaultValue="767"
        type="number"
        onChange={(e) => {
          setUserSetQuery(`screen and (max-width: ${e.target.value}px)`);
        }}
      />
      <p>userSetQuery: {userSetQuery.toString()}</p>
    </div>
  );
};
