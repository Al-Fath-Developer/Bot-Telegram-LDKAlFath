class InventarisRepository{

    constructor (){
        this.konfirmasi_sheet_name = getENV('INVENTARIS_KONFIRMASI_SHEET_NAME')
        this.folder_id = getENV('INVENTARIS_FOLDER_ID')
    }
    /**
     * 
     * @param {number} id_telegram 
     * @param {string} username 
     * @param {string} url_file 
     * @param {Array} caption 
     * @returns {string}
     */
    addKonfirmasiSekre
        (id_telegram,username,url_file, caption){
            let judul = caption.join(" ")
            let drive_id = FileUtils.saveFileToDrive(url_file, username, judul);
            let drive_url =  DriveApp.getFileById(drive_id).moveTo(DriveApp.getFolderById(this.folder_id)).getUrl()
            
            SpreadsheetUtils.createEntry([new Date, id_telegram,username, ...caption , drive_url],this.konfirmasi_sheet_name)
            return drive_url    
           
        }

    
}