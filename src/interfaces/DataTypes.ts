export interface BoardItem {
  id: number;
  title: string;
  cards: CardItem[];
}

export interface CardItem {
  id: number;
  title: string;
  labels: LabelItem[];
  date: string | any;
  tasks: TaskItem[];
  desc?: string;
}

export interface TaskItem {
  id: number;
  completed: boolean;
  text: string;
}

export interface LabelItem {
  color: string;
  text: string;
}

export interface IAuthDataResponse {
  token: string;
}

export interface IBoardDataResponse {
  "0": AllBoards;
}

export interface AllBoards {
  id: string;
  userId: string;
  boards: BoardItem[];
}
