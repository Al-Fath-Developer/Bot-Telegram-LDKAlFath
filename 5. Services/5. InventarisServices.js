
class InventarisServices{
    constructor(){
        this.inventarisRepository = new InventarisRepository()
        this.addKonfirmasiSekre = this.addKonfirmasiSekre.bind(this)

    }
     /**
     *  fungsi untuk menyimpan dokumentasi dan mendapatkan link hasil dokumentasi belajar
     * @param {Array} nim 
     * @param {string} username 
     * @param {string} url_file 
     * @param {string} caption 
     * @returns string Link drive
     */
     addKonfirmasiSekre(identitas, url_file, filename){
        
        const arrFilename = TextUtils.pisahKataPertama(filename)
        return this.inventarisRepository.addKonfirmasiSekre(identitas, url_file, arrFilename)

    }

}
Logger.log("Loaded InventarisServices" + (new Date() - startTime) + "ms")