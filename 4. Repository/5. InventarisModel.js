class InventarisRepository{

    constructor (){
        this.konfirmasi_sheet_name = getMapENV('INVENTARIS_KONFIRMASI_SHEET_NAME')
        this.folder_id = getMapENV('INVENTARIS_FOLDER_ID')
        this.spreadsheet_link = getMapENV('INVENTARIS_SPREADSHEET_LINK')
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
        // return 
        SpreadsheetUtils.appendRowDataToExternalSpreadsheet(
            this.spreadsheet_link,
             this.konfirmasi_sheet_name,
             [new Date, id_telegram,username, ...caption , drive_url])
            
            return drive_url    
           
        }

    
}
Logger.log("Loaded InventarisRepository" + (new Date() - startTime) + "ms")