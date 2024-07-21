class SuratKeluarRepository  {
    constructor (){
        this.post_berita_acara = getENV('SURAT_KELUAR_CREATE_BERITA_ACARA_API')
        this.folder_id =getENV('SURAT_KELUAR_FOLDER_ID')
        this.sheet_name_surat_keluar = getENV('SURAT_KELUAR_SHEET_NAME')
    }
    /**
     * fungsi untuk menyimpan dokumentasi belajaer
     * @param {number} id_telegram id telegram user
     * @param {string} username
     * @param {string} url_file
     * @param {Array} caption
     * @return {string} link drive
     */
    saveSuratKeluar  (id_telegram,username,url_file, caption){
                    let judul = caption.join("")
                    let drive_id = FileUtils.saveFileToDrive(url_file, username, judul);
                    let drive_url =  DriveApp.getFileById(drive_id).moveTo(DriveApp.getFolderById(this.folder_id)).getUrl()
                    
                    SpreadsheetUtils.createEntry([new Date, id_telegram,username, ...caption , drive_url],this.sheet_name_surat_keluar)
                    return drive_url    
                   
                }

          /**
 * @typedef {Object} BeritaAcara
 * @property {number} id_telegram - ID Telegram pengguna
 * @property {string} tanggal_lengkap_acara - Tanggal lengkap acara
 * @property {string} tempat - Tempat acara
 * @property {string} email - Alamat email
 * @property {string} nama_kegiatan - Nama kegiatan
 * @property {string} nama_kepanitiaan - Nama kepanitiaan
 * @property {number} jumlah_peserta - Jumlah peserta
 * @property {string} rangkaian_kegiatan - Rangkaian kegiatan
 * @property {string} dokumentasi - Dokumentasi acara
 * @property {string} kota_pembuatan_surat - Kota pembuatan surat
 * @property {string} jam_selesai - Jam selesai acara
 * @property {string} nama_sekretaris - Nama sekretaris
 * @property {string} nim_sekretaris - NIM sekretaris
 * @property {string} nama_ketua_pelaksana - Nama ketua pelaksana
 * @property {string} asal - Asal peserta atau organisasi
 * @property {string} nim_ketua_pelaksana - NIM ketua pelaksana
 */

/**
 * Membuat berita acara
 * @param {BeritaAcaraData} data - Data berita acara
 */
createBeritaAcara(data) {

        
        const options = {
            
            'method' : 'post',
            'contentType': 'application/json',
            // Convert the JavaScript object to a JSON string.
            'payload' : JSON.stringify(data)
        };
        
        const hasil =   UrlFetchApp.fetch(this.post_berita_acara, options);
        Logger.log(JSON.stringify(hasil))
        return hasil
        
   
                }

                getTemplateSuratKeluar(){

                }

    
}