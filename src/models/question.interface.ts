export interface IQuestion {
  title: string;
  answers: IAnswer[];
}

export enum HOUSES {
  g = "g",
  r = "r",
  h = "h",
  s = "s",
}

export interface IAnswer {
  title: string;
  scores: IScores;
}
export interface IScores {
  [HOUSES.g]: number;
  [HOUSES.r]: number;
  [HOUSES.h]: number;
  [HOUSES.s]: number;
}
