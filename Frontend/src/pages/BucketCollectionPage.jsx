import  { useState , useEffect } from 'react';

import Sidebar from '../components/ui/Sidebar';
import bgimg2 from "../assets/bgimg2.png";
import {  getBuckets,getBucketObj, addBucket , applyBucket ,removeBucket} from '../utils/bucket.utils';
import { useBucket } from '../context/BucketContext.jsx';
import LoadingScreen from "../components/ui/Loadingscreen.jsx"
import { CreateModal } from '../components/ui/CreateModal.jsx';


// --- Sub-component for individual bucket cards ---
const BucketCard = ({id , name, onApply }) => {

const [bucketData, setBucketData] = useState()

useEffect(() => {
  getBucketObj(id).then((result) => {
    setBucketData(JSON.stringify(result.data.data ,  null, 4))
    console.log(result.data.data);
    
    
  }).catch((err) => {
    return err
  });  

}, [])


  


  return (
    <div className="bg-[#0e1112]/90 m-10 w-[600px] lg:w-[400px] backdrop-blur-sm border border-[#1b1e1f] rounded-2xl p-6 shadow-xl flex flex-col  transition-all duration-300 hover:border-[#38bdf8]/50 hover:shadow-[#38bdf8]/5">
  

      <div className="flex-grow mb-6 space-y-2">
        <h3 className="text-2xl font-semibold text-gray-100 tracking-tight font-mono">{id}.{name.split('.')[0]}</h3>
      </div>

      <div className='border border-gray-700 p-3 m-2  rounded-xl ' title='Your bucket Config'>
        <pre className=''>
          {bucketData && bucketData}
        </pre>
      </div>
     
      
      <button 
        onClick={onApply}
        className="w-full bg-[#1c1f20] m-2 hover:bg-[#38bdf8] text-gray-200 hover:text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-inner group flex items-center justify-center space-x-2 border border-transparent hover:border-[#38bdf8]/50"
      >
        <span>Apply</span>

      </button>
       <button 
        onClick={()=>{removeBucket(id)}}
        className="w-full bg-[#1c1f20] m-2 hover:bg-[#f83838] text-gray-200 hover:text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-inner group flex items-center justify-center space-x-2 border border-transparent hover:border-[#f83838]/50"
      >
        <span>Delete</span>

      </button>
    </div>
  );
};

// --- Main Component ---
const BucketCollectionPage = () => {
  const {applyingBucket,setApplyingBucket} = useBucket()
  const [fetchData, setfetchData] = useState()
  const [bucketName, setBucketName] = useState()
  const [open, setOpen] = useState(false);
    
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

const addBucketName = ()=>{
console.log("Process started");

  addBucket(bucketName).then((result) => {
    setOpen(false)
    console.log(result)

  }).catch((err) => {
    return err
  });

}

  return fetchData && !applyingBucket ?
  (
  <div className='mx-auto flex  max-w-[1700px] flex-col lg:flex-row antialiased'>
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
            
            
            <button className="text-gray-400 hover:text-[#38bdf8] transition font-medium" onClick={() => setOpen(true)} >
              + New Bucket
            </button>
          </div>
        </header>

        <main>
          <div className="flex justify-around flex-wrap ">
            {fetchData && fetchData.buckets.map((bucket) => (
              <BucketCard 
                key={bucket.id} 
                {...bucket} 
                onApply={() => {handleApplyTheme(bucket.id);setApplyingBucket(true)}}
              />
            ))}
          </div>
        </main>


        <CreateModal isOpen={open} onClose={() => setOpen(false)}>
          <div className='flex justify-between'>
            <h2>Edit Options</h2>
          <button onClick={() => setOpen(false)}>Close</button>
          </div>

          <div className='m-4'>
            <input type="text" placeholder='Enter the Bucket Name' className='p-3' onChange={(e)=>{setBucketName(e.target.value)}} />
            <button type="button" className='m-2 p-2 border border-gray-200 rounded-xl' onClick={addBucketName}>Add Bucket</button>
          </div>
      </CreateModal>

    
      </div>
    </div>
  </div>
  ):
  <div>
    <LoadingScreen />
  </div>;
};

export default BucketCollectionPage;