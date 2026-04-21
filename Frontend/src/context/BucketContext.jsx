/* eslint-disable react-refresh/only-export-components */
import {useState,createContext, useContext } from "react";


const BucketContext = createContext()

export const BucketProvider = ({children}) => {
const [open,setOpen] = useState(false)
const [applyingBucket , setApplyingBucket] = useState(false)



    return (
    <BucketContext.Provider value={{open,setOpen,applyingBucket,setApplyingBucket}}>
        {children}
    </BucketContext.Provider>
  )
}

export const useBucket = ()=> useContext(BucketContext)
