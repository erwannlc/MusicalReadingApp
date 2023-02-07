import { FC, ReactNode } from "react";

export interface MessageObj {
  className?: string
  content: FC | ReactNode
  isModal?: boolean
  modal?: {
    className?: string,
    content: FC | ReactNode
  }
};

interface Correction {
  id: string,
  className: string,
  content: ReactNode
};

export interface CorrectionTD extends Array<Correction>{};