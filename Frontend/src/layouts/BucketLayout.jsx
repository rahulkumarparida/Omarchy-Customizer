import { BucketProvider } from "../context/BucketContext"
import {Outlet} from "react-router-dom"

const BucketCollectionLayout = ()=>(

    <BucketProvider>
        <Outlet />
    </BucketProvider>
)

export default BucketCollectionLayout