import {Outlet} from "react-router-dom"
import {ThemeProvider} from "../context/ThemeContext.jsx"

const CollectionLayout = ()=>(

    <ThemeProvider>
        <Outlet />
    </ThemeProvider>
)

export default CollectionLayout