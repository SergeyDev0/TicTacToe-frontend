type CellValue = "X" | "0" | null;
type Board = CellValue[][];
type Status = "Active" | "Completed";
type CurrentMove =  "0" | "X";
type Result = "None" | "X" | "0" | "Draw";

export interface Games {
	id: string;
}

export interface Game {
	id: string;
  status: Status;
  board: Board;
  result: Result;
  createdAt: string;
  currentMove: CurrentMove;
  currentStep: number;
}

export interface iCreateGame {
	size: number;
	line_to_win: number;
	chance: number;
	step: number;
}

export interface iCreateGameReq {
  id: string;
  status: Status;
  board: Board;
  result: number;
  createdAt: string;
  currentMove: number;
  currentStep: number;
}

export interface iMove {
  p: string;
  x: number;
  y: number;
}

export interface iMoveReq {
  id: string;
  status: Status
  board: Board
  result: 0
  createdAt: string,
  currentMove: CurrentMove,
  currentStep: number
}