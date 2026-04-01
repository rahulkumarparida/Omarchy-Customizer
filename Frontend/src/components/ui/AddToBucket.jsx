import { toast } from 'react-toastify';

import { getBucketObj, bucketPayloadCreate, addBucket } from '../../utils/bucket.utils.js';

const AddToBucket = ({ data ,  onClose , payload  , featureName}) => {

const notify = (msg) => toast(msg);

function addDataToBucket(id){
  getBucketObj(id).then((result) => {
  
        let newData = bucketPayloadCreate(result.data.data , featureName , payload) 

        addBucket(result.data.filename , newData)
        
        notify("Theme Added to bucket!!")  
        setTimeout(() => {
          location.replace(window.location.pathname)    
          
        }, 1000);
    }).catch((err) => {
        return err
    })
    
}



  return (
    // Full screen background (simulating the dark environment)
    <div className=" bg-black flex items-center justify-center p-6 font-sans">
      
      {/* Main Container */}
      <div className="w-full max-w-4xl bg-black">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 px-2">
          <h1 className="text-white text-2xl font-bold tracking-wide">
            Choose the bucket
          </h1>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1 cursor-pointer"
          >
            <span className="text-xs mb-[2px]">x</span> close
          </button>
        </div>

        {/* Grid Section for Buckets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((bucket) => (
            <div 
              key={bucket.id} 
              className="bg-[#1c1c1e] rounded-3xl p-6 flex flex-col items-start transition-transform hover:scale-[1.02]"
            >
              {/* Bucket Name */}
              <span className="text-gray-200 text-lg mb-8 ml-2">
                {bucket.name}
              </span>
              
              {/* Action Button */}
              <button  id={bucket.id}
                className="w-[85%] bucketChoosen mx-auto bg-[#09090b] text-gray-300 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-200 text-sm font-medium" 
                onClick={()=>{addDataToBucket(bucket.id);} }
              >
                Add to this
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AddToBucket;