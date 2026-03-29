import {useState,createContext, useContext } from "react";


const BucketContext = createContext()

export const BucketProvider = ({children}) => {
const [bucket,setbucket] = useState()
const [applyingBucket , setApplyingBucket] = useState(false)



    return (
    <BucketContext.Provider value={{bucket,setbucket,applyingBucket,setApplyingBucket}}>
        {children}
    </BucketContext.Provider>
  )
}

export const useBucket = ()=> useContext(BucketContext)

