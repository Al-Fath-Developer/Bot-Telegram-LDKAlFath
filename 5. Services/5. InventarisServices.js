
class InventarisServices{
    constructor(){
        this.inventarisRepository = new InventarisRepository()
        this.addKonfirmasiSekre = this.addKonfirmasiSekre.bind(this)

    }
     /**
     *  fungsi untuk menyimpan dokumentasi dan mendapatkan link hasil dokumentasi belajar
     * @param {number} id_telegram 
     * @param {string} username 
     * @param {string} url_file 
     * @param {string} caption 
     * @returns string Link drive
     */
     addKonfirmasiSekre(id_telegram, username, url_file, caption){
        const arrCaption = TextUtils.pisahKataPertama(caption)
        return this.inventarisRepository.addKonfirmasiSekre(id_telegram, username, url_file, arrCaption)

    }

}
Logger.log("Loaded InventarisServices" + (new Date() - startTime) + "ms")