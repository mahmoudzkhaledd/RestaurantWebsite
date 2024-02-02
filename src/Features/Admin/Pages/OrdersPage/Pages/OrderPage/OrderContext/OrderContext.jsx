import { createContext } from 'react';


export const orderContext = createContext();

export default function OrderContextProvider({ children }) {
    return <orderContext.Provider value={{order: null}}>
        {children}
    </orderContext.Provider>
}