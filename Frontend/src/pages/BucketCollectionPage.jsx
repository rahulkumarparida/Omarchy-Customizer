import React, { useState , useEffect } from 'react';
import Sidebar from '../components/ui/Sidebar';
import bgimg2 from "../assets/bgimg2.png";
import {  getBuckets , applyBucket} from '../utils/bucket.utils';
import { useBucket } from '../context/BucketContext.jsx';
import LoadingScreen from "../components/ui/Loadingscreen.jsx"




// --- Sub-component for individual bucket cards ---
const BucketCard = ({ name, onApply }) => {


  


  return (
    <div className="bg-[#0e1112]/90 m-10 w-[600px] lg:w-[400px] backdrop-blur-sm border border-[#1b1e1f] rounded-2xl p-6 shadow-xl flex flex-col  transition-all duration-300 hover:border-[#38bdf8]/50 hover:shadow-[#38bdf8]/5">
  

      {/* 2. Text Details */}
      <div className="flex-grow mb-6 space-y-2">
        <h3 className="text-2xl font-semibold text-gray-100 tracking-tight font-mono">{name}</h3>
      </div>

      {/* 3. Apply Button */}
      <button 
        onClick={onApply}
        className="w-full bg-[#1c1f20] hover:bg-[#38bdf8] text-gray-200 hover:text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-inner group flex items-center justify-center space-x-2 border border-transparent hover:border-[#38bdf8]/50"
      >
        <span>Apply</span>

      </button>
    </div>
  );
};

// --- Main Component ---
const BucketCollectionPage = () => {
  const {applyingBucket,setApplyingBucket} = useBucket()
  const [fetchData, setfetchData] = useState()
    
  useEffect(() => {
    getBuckets().then((result) => {
      
      setfetchData(result.data)

            
    }).catch((err) => {
      console.error("Error: ", err);
      
    });  
  
  }, [])

  const handleApplyTheme = (id) => {
    // Implement your 'Apply' logic here (e.g., API call, state update)
    console.log(`Applying bucket theme ID: ${id}`);
    applyBucket(id).then((res) => {
     
    
    if (res) {
      setApplyingBucket(false)
      
    }
    }).catch((err) => {
      console.error("Error: ",err);
      
    });
   
    
  };



  return fetchData && !applyingBucket ?
  (
  <div className='mx-auto flex h-screen max-w-[1700px] flex-col lg:flex-row antialiased'>
     <Sidebar/>
      <div 
      className="w-screen bg-[#050607] text-gray-100 font-sans p-6 md:p-12"
      style={{ 
        backgroundImage: `url(${bgimg2})`, 
        backgroundSize: 'contain', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        
      }}
    >
        
      <div className="max-w-[1600px] mx-auto">
        {/* --- Header Area --- */}
        <header className="mb-12 border-b border-[#1b1e1f] pb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tighter text-gray-50 font-mono">My Buckets</h1>
              <p className="text-gray-500 mt-1 max-w-xl">
                A personal, curated selection of system configuration themes and visual asset collections.
              </p>
            </div>
            
            {/* 
            <button className="text-gray-400 hover:text-[#38bdf8] transition font-medium">
              + New Bucket
            </button> */}
          </div>
        </header>

        {/* --- Bucket Cards Grid --- */}
        <main>
          <div className="flex justify-start flex-wrap ">
            {fetchData && fetchData.buckets.map((bucket) => (
              <BucketCard 
                key={bucket.id} 
                {...bucket} 
                onApply={() => {handleApplyTheme(bucket.id);setApplyingBucket(true)}}
              />
            ))}
          </div>
        </main>

    
      </div>
    </div>
  </div>
  ):
  <div>
    <LoadingScreen />
  </div>;
};

export default BucketCollectionPage;