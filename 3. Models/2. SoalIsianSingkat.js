/**
 * Kelas yang merepresentasikan Soal Isian Singkat.
 */
class SoalIsianSingkat {
    /**
     * Membuat instance SoalIsianSingkat baru.
     * @param {Object} params - Parameter untuk membuat SoalIsianSingkat.
     * @param {string} params.id_soal - ID soal.
     * @param {string} params.template_pertanyaan - Template pertanyaan.
     * @param {string} params.spreadsheet_hasil_link - Link spreadsheet hasil.
     * @param {string} params.sheet_hasil_name - Nama sheet hasil.
     * @param {boolean} params.bukti_lokasi - Bukti lokasi.
     */
    constructor({ id_soal, template_pertanyaan, spreadsheet_hasil_link, sheet_hasil_name, bukti_lokasi }) {
      this._id_soal = id_soal;
      this._template_pertanyaan = template_pertanyaan;
      this._spreadsheet_hasil_link = spreadsheet_hasil_link;
      this._sheet_hasil_name = sheet_hasil_name;
      this._bukti_lokasi = bukti_lokasi;
    }
    get bukti_lokasi() {
      return this._bukti_lokasi;
    }
    set bukti_lokasi(value) {
      this._bukti_lokasi = value;
    }

    /**
     * Mendapatkan ID soal.
     * @returns {string} ID soal.
     */
    get id_soal() {
      return this._id_soal;
    }
  
    /**
     * Mengatur ID soal.
     * @param {string} value - ID soal baru.
     */
    set id_soal(value) {
      this._id_soal = value;
    }
  
    /**
     * Mendapatkan template pertanyaan.
     * @returns {string} Template pertanyaan.
     */
    get template_pertanyaan() {
      return this._template_pertanyaan;
    }
  
    /**
     * Mengatur template pertanyaan.
     * @param {string} value - Template pertanyaan baru.
     */
    set template_pertanyaan(value) {
      this._template_pertanyaan = value;
    }
  
    /**
     * Mendapatkan link spreadsheet hasil.
     * @returns {string} Link spreadsheet hasil.
     */
    get spreadsheet_hasil_link() {
      return this._spreadsheet_hasil_link;
    }
  
    /**
     * Mengatur link spreadsheet hasil.
     * @param {string} value - Link spreadsheet hasil baru.
     */
    set spreadsheet_hasil_link(value) {
      this._spreadsheet_hasil_link = value;
    }
  
    /**
     * Mendapatkan nama sheet hasil.
     * @returns {string} Nama sheet hasil.
     */
    get sheet_hasil_name() {
      return this._sheet_hasil_name;
    }
  
    /**
     * Mengatur nama sheet hasil.
     * @param {string} value - Nama sheet hasil baru.
     */
    set sheet_hasil_name(value) {
      this._sheet_hasil_name = value;
    }
  }
  Logger.log("Loaded SoalIsianSingkat.js" + (new Date() - startTime) + "ms")