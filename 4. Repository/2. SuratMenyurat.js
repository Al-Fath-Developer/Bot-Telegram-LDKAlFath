class SuratMenyuratRepository  {
    constructor (){
        this.post_berita_acara = getMapENV('CREATE_BERITA_ACARA_API')
        
        this.surat_keluar_folder_id =getMapENV('SURAT_KELUAR_FOLDER_ID')
        this.surat_masuk_folder_id =getMapENV('SURAT_MASUK_FOLDER_ID')

        this.spreadsheet_link = getMapENV('SURAT_MENYURAT_SPREADSHEET_LINK')
        this.sheet_name_surat_keluar = getMapENV('SURAT_KELUAR_SHEET_NAME')
        this.sheet_name_surat_masuk = getMapENV('SURAT_MASUK_SHEET_NAME')
        this.sheet_name_berita_acara = getMapENV('BERITA_ACARA_SHEET_NAME')
        
    }
    /**
     * fungsi untuk menyimpan dokumentasi belajaer
     * @param {number} id_telegram id telegram user
     * @param {string} username
     * @param {string} url_file
     * @param {Array} caption
     * @return {string} link drive
     */
    saveSuratKeluar  (id_telegram,username,drive_url, caption){
                   
        SpreadsheetUtils.appendRowDataToExternalSpreadsheet(
            this.spreadsheet_link, this.sheet_name_surat_keluar, 
            [new Date, id_telegram,username, ...caption , drive_url])
                    
                    // SpreadsheetUtils.createEntry([new Date, id_telegram,username, ...caption , drive_url],this.sheet_name_surat_keluar)
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
        SpreadsheetUtils.appendRowDataToExternalSpreadsheet(
            this.spreadsheet_link, this.sheet_name_berita_acara, 
            [new Date, data.id_telegram, data.nama_kegiatan])
                
        const hasil =   UrlFetchApp.fetch(this.post_berita_acara, options);
        Logger.log(JSON.stringify(hasil))

        return hasil
        
   
                }

          
    
}
Logger.log("Loaded SuratMenyuratRepository.js" + (new Date() - startTime) + "ms")