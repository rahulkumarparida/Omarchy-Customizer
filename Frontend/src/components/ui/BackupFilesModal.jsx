import { useState  } from 'react';
import { CreateModal } from './CreateModal';
import { createBackupFile } from '../../utils/backup.utils';

const BackupFilesModal = ({fetchFilesData , open, setOpen}) => {
  

const [selectedIds, setSelectedIds] = useState([]);

  const handleToggle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  const handleAddToBackup = () => {
    const selectedObjects = fetchFilesData.filter((item) =>
      selectedIds.includes(item.id)
    );

    createBackupFile().then((result) => {
        
        
    }).catch((err) => {
        console.log("error: ",err);
        
        return err
    });


    console.log(selectedObjects);     
    setOpen(false)

  };

  if (!open) return null;




  return <CreateModal isOpen={open} onClose={() => setOpen(false)}>

                    <div className=" flex items-center justify-center backdrop-blur-sm p-2">
                    
                  <div className=" w-[100%] max-w-7xl max-h-[80vh] flex flex-col  rounded-2xl shadow-2xl">
                        <div className="top">

                    <div className='boder'>
                      <span className=''>
                        Select all the files you want to backup.
                      </span>
                    </div>
                      
                      <div className="flex justify-end mb-8">
                        <button
                          onClick={() => setOpen(false)}
                          className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-1"
                        >
                          <span className="text-lg leading-none">&times;</span> Close
                        </button>
                      </div>

                </div>      

              <div className="w-full p-5 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 mb-5 flex-1">
                        {fetchFilesData && fetchFilesData.map((option) => {
                          const isSelected = selectedIds.includes(option.id);

                          return (
                            <div
                              key={option.id}
                              onClick={() => handleToggle(option.id)}
                              className={`flex items-center  p-2 rounded-md cursor-pointer transition-all duration-200 border
                                
                                ${
                                  isSelected
                                    ? "bg-blue-500/20 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]"
                                    : "bg-[#27272a] border-transparent hover:bg-[#323236]"
                                }
                              `}
                            >

                              <div
                                className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center transition-all duration-200 
                                  ${
                                    isSelected
                                      ? "bg-blue-500"
                                      : "bg-[#09090b] border border-gray-600"
                                  }
                                `}
                              >
                                {isSelected && (
                                  <div className="w-[20px] h-[20px] bg-white rounded-full" />
                                )}
                              </div>


                              <span
                                className={`text-sm font-medium select-none px-2 transition-colors
                                  ${
                                    isSelected ? "text-white" : "text-gray-300"
                                  }
                                `}
                              >
                                {option.item_name}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                          <div className="flex justify-end">
                            <button
                              onClick={handleAddToBackup}
                              className="bg-[#27272a] hover:bg-[#3f3f46] text-gray-200 px-8 py-3 rounded-full text-sm font-medium transition-all duration-200 active:scale-95"
                            >
                              Add To Backup
                            </button>
                          </div>
                        </div>
                      </div>
                </CreateModal>

}

export default BackupFilesModal