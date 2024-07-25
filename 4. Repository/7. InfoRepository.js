class InfoRepository{
    constructor (){
        this.sheet_name = getMapENV('INFO_SHEET_NAME')
    }

    /**
     * mengambil isi sel
     * @param {string} cellPosition posisi sel, contoh  A2
     * @returns {string}
     */
    getCellValueByCellPosition(cellPosition){
        return SpreadsheetUtils.getCellValueByCellPosition(cellPosition, this.sheet_name,true)
    }
}
Logger.log("Loaded InfoRepository" + (new Date() - startTime) + "ms")