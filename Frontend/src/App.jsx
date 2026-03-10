import api from "./api/api.js"
import { useEffect } from "react"

function App() {
  
    async function fetchTest() {
        let res =await api.get("/")
        console.log(res)
      }
      
  useEffect(()=>{
    fetchTest()
    
  },[])

  return (
   <div className='bg-black text-yellow-500'>
    Hello
   </div>
  )
}

export default App
