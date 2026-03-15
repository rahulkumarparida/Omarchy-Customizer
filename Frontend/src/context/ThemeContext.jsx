import { useState ,createContext, useContext } from "react";




const ThemeContext = createContext();

export const ThemeProvider =({children}) => {
    const [isWorking, setIsWorking] = useState(false)

  return (
   <ThemeContext.Provider value={ isWorking , setIsWorking }>
    {children}
   </ThemeContext.Provider>
  )
}
