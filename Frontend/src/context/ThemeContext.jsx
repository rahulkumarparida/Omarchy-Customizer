import { useState ,createContext, useContext } from "react";




const ThemeContext = createContext();

export const ThemeProvider =({children}) => {
    const [isWorking, setIsWorking] = useState(false)
    const [detailsPage,setDetailsPage]= useState()

  return (
   <ThemeContext.Provider value={ { isWorking, setIsWorking , detailsPage,setDetailsPage} }>
    {children}
   </ThemeContext.Provider>
  )
}

export const useTheme =() => useContext(ThemeContext)