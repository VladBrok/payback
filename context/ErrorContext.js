import { createContext } from "react";

const Context = createContext(false);
const ContextProvider = Context.Provider;
export { Context };
export default ContextProvider;
