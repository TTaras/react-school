import { CHANGE_NAME } from "./types";


export const changeName = (name) => ({
  type: CHANGE_NAME,
  name,
});