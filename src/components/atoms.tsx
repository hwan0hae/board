import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "boardLodal",
  storage: localStorage,
});

export interface IDndToDo {
  id: number;
  text: string;
}
export interface IDndToDoState {
  [key: string]: IDndToDo[];
}

export const dndToDoState = atom<IDndToDoState>({
  key: "dndToDo",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
