import { ApiTask } from "../data/dataApi";
import { BoardItem } from "../interfaces/DataTypes";

const LocalStorageKeyName = "task-board";

export class BoardAPI {
  setBoardList(): Promise<BoardItem[]> {
    const apiData: BoardItem[] = ApiTask;
    let BoardList: BoardItem[] = [];

    if (localStorage.getItem(LocalStorageKeyName)) {
      const localStorageData = JSON.parse(
        localStorage.getItem(LocalStorageKeyName) ?? ""
      );
      BoardList = [...localStorageData];
      return Promise.resolve(BoardList);
    } else {
      BoardList = [...apiData];
      updateLocaleStorageBoards(BoardList);
      return Promise.resolve(BoardList);
    }
  }
}

export async function setBoardList() {
  const api = new BoardAPI();
  return api.setBoardList();
}

export function updateLocaleStorageBoards(boards: BoardItem[]) {
  localStorage.setItem(LocalStorageKeyName, JSON.stringify(boards));
}
