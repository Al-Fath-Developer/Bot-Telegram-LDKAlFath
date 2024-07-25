class InventarisRepository{

    constructor (){
        this.konfirmasi_sheet_name = getMapENV('INVENTARIS_KONFIRMASI_SHEET_NAME')
        this.folder_id = getMapENV('INVENTARIS_FOLDER_ID')
        this.spreadsheet_link = getMapENV('INVENTARIS_SPREADSHEET_LINK')
    }
    /**
     * 
     * @param {Array} identitas 
     * @param {string} username 
     * @param {string} url_file 
     * @param {Array} caption 
     * @returns {string}
     */
    addKonfirmasiSekre
        (identitas,url_file, arrFilename){
        // return 
        SpreadsheetUtils.appendRowDataToExternalSpreadsheet(
            this.spreadsheet_link,
             this.konfirmasi_sheet_name,
             [new Date, ...identitas, ...arrFilename , url_file])
            
            return url_file    
           
        }

    
}
Logger.log("Loaded InventarisRepository" + (new Date() - startTime) + "ms")