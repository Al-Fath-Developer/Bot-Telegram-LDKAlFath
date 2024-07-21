const inventarisRepository = new InventarisRepository()

class InventarisServices{
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
        return inventarisRepository.addKonfirmasiSekre(id_telegram, username, url_file, arrCaption)

    }

}