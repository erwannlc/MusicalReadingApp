import { type CSSProperties } from "react";
import type { CreateMutable } from "./CreateMutable";

interface CSSProps extends CSSProperties {
  "--pointer-left"?: string
  "--pointer-right"?: string
  "--pointer-top"?: string
  "--pointer-bottom"?: string
  "--tempo-time"?: string
};
export type CSSPropertiesWithVars = CreateMutable<CSSProps>;
