
class SuratMenyuratServices{
    constructor(){
        this.suratMenyuratRepository = new SuratMenyuratRepository()
        this.addSuratKeluar = this.addSuratKeluar.bind(this)
        this.createBeritaAcara = this.createBeritaAcara.bind(this)
        this.getBeritaAcaraRegexResult = this.getBeritaAcaraRegexResult.bind(this)
        

    }
    /**
     *  fungsi untuk menyimpan dokumentasi dan mendapatkan link hasil dokumentasi belajar
     * @param {number} id_telegram 
     * @param {string} username 
     * @param {string} drive_url 
     * @param {string} caption 
     * @returns string Link drive
     */
    addSuratKeluar(id_telegram, username, drive_url, caption){
        const arrCaption = TextUtils.pisahKodeNomorSurat(caption)
        return this.suratMenyuratRepository.saveSuratKeluar(id_telegram, username, drive_url, arrCaption)

    }

    /**
     * membuat berita acara
     * @param {BeritaAcara} beritaAcara 
     */
    createBeritaAcara(beritaAcara){



        return this.suratMenyuratRepository.createBeritaAcara(beritaAcara)
    }
    /**
     * 
     * @param {String} raw 
     * @returns {BeritaAcara} - berita acara
     */
    getBeritaAcaraRegexResult(raw, template){

        
        const result =         TextUtils.getRegexResult(raw, template)


       
    const beritaAcara  = {}
    
    
beritaAcara.asal = result[0]
beritaAcara.nama_kegiatan = result[1]
beritaAcara.nama_kepanitiaan = result[2]
beritaAcara.jumlah_peserta = result[3]
beritaAcara.rangkaian_kegiatan = result[4]
beritaAcara.dokumentasi = result[5]
beritaAcara.tanggal_lengkap_acara = result[6]
beritaAcara.jam_selesai = result[7]
beritaAcara.tempat = result[8]
beritaAcara.email = result[9]
beritaAcara.kota_pembuatan_surat = result[10]
beritaAcara.nim_ketua_pelaksana = result[11]
beritaAcara.nama_ketua_pelaksana = result[12]
beritaAcara.nim_sekretaris = result[13]
beritaAcara.nama_sekretaris = result[14]







       
        return beritaAcara
         
    }

}
Logger.log("Loaded SuratMenyuratServices.js" + (new Date() - startTime) + "ms")