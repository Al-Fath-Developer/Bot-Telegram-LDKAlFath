const soalIsianSingkatRepo = new SoalIsianSingkatRepository()
/**
 * Kelas yang menyediakan layanan untuk mengelola soal isian singkat.
 */

class SoalIsianSingkatServices{

    /**
     * Mengambil data soal bedasarkan id
     * @param {Number} id_soal 
     * @returns {SoalIsianSingkat}
     */
    getDataSoalLengkapById(id_soal){
    const soalIsianSingkatData =     soalIsianSingkatRepo.getDataSoalLengkapById(id_soal)
    return soalIsianSingkatData
        
    
}

  /**
     * Menambahkan jawaban dari pengguna ke spreadsheet
     * @param {string} id_telegram - ID Telegram pengguna
     * @param {string} nim - Nomor Induk Mahasiswa
     * @param {Array} arrAnswer - Array berisi jawaban pengguna
     * @param {string} spreadsheet_hasil_link - Link spreadsheet hasil
     * @param {string} sheet_hasil_name - Nama sheet hasil
     * @returns {number} Nomor baris terakhir yang ditambahkan
     */
    addAnswerFromUser(id_telegram, nim, arrAnswer, spreadsheet_hasil_link, sheet_hasil_name){
        const result = [new Date(), id_telegram, nim, ...arrAnswer]
        const lastRow = soalIsianSingkatRepo.addAnswerFromUser(result,spreadsheet_hasil_link, sheet_hasil_name )
        return lastRow
        
    }
      /**
     * Menambahkan jawaban dari pengguna ke spreadsheet
     * @param {string} id_telegram - ID Telegram pengguna
     * @param {string} username - Nomor Induk Mahasiswa
     * @param {Array} arrAnswer - Array berisi jawaban pengguna
     * @param {string} spreadsheet_hasil_link - Link spreadsheet hasil
     * @param {string} sheet_hasil_name - Nama sheet hasil
     * @returns {number} Nomor baris terakhir yang ditambahkan
     */
      addAnswerFromGuest(id_telegram, username, arrAnswer, spreadsheet_hasil_link, sheet_hasil_name){
        const result = [new Date(), id_telegram, username, ...arrAnswer]
        const lastRow = soalIsianSingkatRepo.addAnswerFromUser(result,spreadsheet_hasil_link, sheet_hasil_name )
        return lastRow
        
    }
}