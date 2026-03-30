import {createContext} from "react";

export const ContactStateContext = createContext(); // 변경될 수 있는 값 (contacts)
export const ContactDispatchContext = createContext(); // 변경되지 않는 값(onCreate, onDelete)
