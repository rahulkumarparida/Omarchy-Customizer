import {useState,createContext, useContext } from "react";


const BucketContext = createContext()

export const BucketProvider = ({children}) => {
const [addBucket,setAddBucket] = useState()
const [applyingBucket , setApplyingBucket] = useState(false)



    return (
    <BucketContext.Provider value={{addBucket,setAddBucket,applyingBucket,setApplyingBucket}}>
        {children}
    </BucketContext.Provider>
  )
}

export const useBucket = ()=> useContext(BucketContext)

