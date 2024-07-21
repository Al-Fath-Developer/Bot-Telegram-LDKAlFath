const infoRepository = new InfoRepository()
class InfoServices{

    /**
     * 
     * @param {string} cellPosition Posisi sel, contoh A2
     * @returns {String} isi sel
     */
    getCellValueByCellPosition(cellPosition){
        return  infoRepository.getCellValueByCellPosition(cellPosition)
    }

}