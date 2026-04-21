import api from '../api/api.js'


async function getAllConfigFiles() {
    try {
        let response = await api.get('/api/backup/files')
        // console.log("Backups: ",response);
        

        return response.data
        
    } catch (error) {
        console.log('error:',error);
        
        return "Error: " + error
    }    
}


async function getAllBackupFiles() {
        try {
        let response = await api.get('/api/backup/')
       

        return response.data
        
    } catch (error) {
        console.log('error:',error);
        
        return "Error: " + error
    } 
    
}



async function createBackupFile(payload) {

try {
    const response = await api.post('/api/backup/',payload)
  console.log(response);
  
    
    return response.data


} catch (error) {
    console.error('Error: ', error);
    
    return "Error: " + error
}
}


async function applyBackup(filename) {
    try {
        const response = await api.post(`/api/backup/apply?filename=${filename}`)
        console.log('Response: ',response);

        return response.data
        
        
    } catch (error) {
        return error
    }
}



async function deleteBackup(dirname) {
     try {
        const response = await api.delete(`/api/backup/?dirname=${dirname}`)
        console.log('Response: ',response);

        return response.data
        
        
    } catch (error) {
        return error
    }
    
}


export { getAllBackupFiles , getAllConfigFiles , createBackupFile , applyBackup , deleteBackup}