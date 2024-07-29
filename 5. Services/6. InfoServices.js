class InfoServices{
    constructor(){
        this.infoRepository = new InfoRepository()
        this.getCellValueByCellPosition = this.getCellValueByCellPosition.bind(this)
    }
    
    /**
     * 
     * @param {string} cellPosition Posisi sel, contoh A2
     * @returns {String} isi sel
     */
    getCellValueByCellPosition(cellPosition){
        return  this.infoRepository.getCellValueByCellPosition(cellPosition)  + TextUtils.watermark    //nitambah wm
    }

}
Logger.log("Loaded InfoServices" + (new Date() - startTime) + "ms")