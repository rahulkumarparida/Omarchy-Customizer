import React, { useState , useEffect } from 'react';
import Select from 'react-select'
import Sidebar from '../components/ui/Sidebar';
import bgimg2 from "../assets/bgimg2.png";
import { getAllBackupFiles , getAllConfigFiles , createBackupFile ,applyBackup, deleteBackup } from '../utils/backup.utils.js';
import LoadingScreen from "../components/ui/Loadingscreen.jsx"
import { CreateModal } from '../components/ui/CreateModal.jsx';
import BackupFilesModal from '../components/ui/BackupFilesModal.jsx';


const BackupCard = (backup) => {





  


  return (
    <div className="bg-[#0e1112]/90 m-10 w-[600px] lg:w-[400px] backdrop-blur-sm border border-[#1b1e1f] rounded-2xl p-6 shadow-xl flex flex-col  transition-all duration-300 hover:border-[#38bdf8]/50 hover:shadow-[#38bdf8]/5">
  

      <div className="flex-grow mb-6 space-y-2">
        <h3 className="text-2xl font-semibold text-gray-100 tracking-tight font-mono">{backup.name}</h3>
      </div>

      {/* <div className='border border-gray-700 p-3 m-2  rounded-xl ' title='Your bucket Config'>
        <pre className=''>
       
        </pre>
      </div>
      */}
      
      <button 
        onClick={()=>{backup.setChangesDone(true);applyBackup(backup.name).then((result) => {
          backup.setChangesDone(false);
          window.location.reload()  
          return result
        }).catch((err) => {
        backup.setChangesDone(false);
          return err
        });}}
        className="w-full bg-[#1c1f20] m-2 hover:bg-[#38bdf8] text-gray-200 hover:text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-inner group flex items-center justify-center space-x-2 border border-transparent hover:border-[#38bdf8]/50"
      >
        <span>Apply</span>

      </button>

       <button 
       onClick={()=>{backup.setChangesDone(true);deleteBackup(backup.name).then((result) => {
          backup.setChangesDone(false);
          window.location.reload()
          return result
        }).catch((err) => {
        backup.setChangesDone(false);
          return err
        });}}
        className="w-full bg-[#1c1f20] m-2 hover:bg-[#f83838] text-gray-200 hover:text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-inner group flex items-center justify-center space-x-2 border border-transparent hover:border-[#f83838]/50"
      >
        <span>Delete</span>

      </button>
    </div>
  );
};



const BackupPage = () => {
  
  const [fetchData, setfetchData] = useState()
  const [open, setOpen] = useState(false);
  // const [newBackup,setNewBackup] = useState(false)
  const [fetchFilesData,setFetchFilesData] = useState()
  const [changesDone  , setChangesDone] = useState(false)

  
  useEffect(() => {
    getAllBackupFiles().then((result) => {
      setfetchData(result)
  
    }).catch((err) => {
      console.error("Error: ", err);
      
    });  

    getAllConfigFiles().then((result) => {
  
      setFetchFilesData(result.data)
  
    }).catch((err) => {
      console.error("Error: ", err);
      
    });  
    
  
  }, [])




  return fetchData && !changesDone ?(
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
      
        <header className="mb-12 border-b border-[#1b1e1f] pb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tighter text-gray-50 font-mono">My Backups</h1>
              <p className="text-gray-500 mt-1 max-w-xl">
                A personal, curated selection of system configuration themes and visual asset backups.
              </p>
            </div>
            
            
            <button className="text-gray-400 hover:text-[#38bdf8] transition font-medium" onClick={() => setOpen(true)} >
              + New Backup
            </button>
          </div>
        </header>

        <main>
          <div className="flex justify-start flex-wrap ">
            {fetchData.backups && fetchData.backups.map((backup , idx) => (
              <BackupCard 
                key={idx} 
                name={backup} 
                setChangesDone={setChangesDone}
              />
            ))}
          </div>
        </main>


        <BackupFilesModal fetchFilesData={fetchFilesData} open={open} setOpen={setOpen} setChangesDone={setChangesDone} />


    
      </div>
    </div>
  </div>
  ):
  <div>
    <LoadingScreen />
  </div>
}

export default BackupPage