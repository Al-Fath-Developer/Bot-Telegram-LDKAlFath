/**
 * Kelas yang menyediakan layanan untuk mengelola soal isian singkat.
*/

class SoalIsianSingkatServices{
  constructor(){
        this.soalIsianSingkatRepo = new SoalIsianSingkatRepository()
        this.getDataSoalLengkapById = this.getDataSoalLengkapById.bind(this)
        this.addAnswerFromUser = this.addAnswerFromUser.bind(this)
        this.addAnswerFromUserGuest = this.addAnswerFromUserGuest.bind(this)

    }

    /**
     * Mengambil data soal bedasarkan id
     * @param {Number} id_soal 
     * @returns {SoalIsianSingkat}
     */
    getDataSoalLengkapById(id_soal){
    const soalIsianSingkatData =     this.soalIsianSingkatRepo.getDataSoalLengkapById(id_soal)
    return soalIsianSingkatData
        
    
}

  /**
     * Menambahkan jawaban dari pengguna ke spreadsheet
     * @param {string} id_telegram - ID Telegram pengguna
     * @param {User} user - Nomor Induk Mahasiswa
     * @param {Array} arrAnswer - Array berisi jawaban pengguna
     * @param {string} spreadsheet_hasil_link - Link spreadsheet hasil
     * @param {string} sheet_hasil_name - Nama sheet hasil
     * @returns {number} Nomor baris terakhir yang ditambahkan
     */
    addAnswerFromUser(id_telegram, user, arrAnswer, spreadsheet_hasil_link, sheet_hasil_name){
      
      const arrUser = Object.values(user)

        const result = [new Date(), Utilities.base64Encode( id_telegram), ...arrUser, ...arrAnswer]
        const lastRow = this.soalIsianSingkatRepo.addAnswerFromUser(result,spreadsheet_hasil_link, sheet_hasil_name )
        return lastRow
        
    }
  /**
     * Menambahkan jawaban dari pengguna ke spreadsheet
     * @param {string} id_telegram - ID Telegram pengguna
     * @param {User} user - Nomor Induk Mahasiswa
     * @param {Array} arrAnswer - Array berisi jawaban pengguna
     * @param {string} spreadsheet_hasil_link - Link spreadsheet hasil
     * @param {string} sheet_hasil_name - Nama sheet hasil
     * @returns {number} Nomor baris terakhir yang ditambahkan
     */
    addAnswerFromUserGuest(id_telegram,  arrAnswer, spreadsheet_hasil_link, sheet_hasil_name){
      

        const result = [new Date(), Utilities.base64Encode( id_telegram), ...arrAnswer]
        const lastRow = this.soalIsianSingkatRepo.addAnswerFromUser(result,spreadsheet_hasil_link, sheet_hasil_name )
        return lastRow
        
    }
      
}
Logger.log("Loaded SoalIsianSingkatServices" + (new Date() - startTime) + "ms")