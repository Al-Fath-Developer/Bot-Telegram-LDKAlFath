/**
 * Builder untuk membuat instance SoalIsianSingkat.
 */
class SoalIsianSingkatBuilder {
    /**
     * Membuat instance SoalIsianSingkatBuilder baru.
     */
    constructor() {
      this.id_soal = '';
      this.template_pertanyaan = '';
      this.spreadsheet_hasil_link = '';
      this.sheet_hasil_name = '';
    }
  
    /**
     * Mengatur ID soal.
     * @param {string} id_soal - ID soal.
     * @returns {SoalIsianSingkatBuilder} Instance builder ini.
     */
    setIdSoal(id_soal) {
      this.id_soal = id_soal;
      return this;
    }
  
    /**
     * Mengatur template pertanyaan.
     * @param {string} template_pertanyaan - Template pertanyaan.
     * @returns {SoalIsianSingkatBuilder} Instance builder ini.
     */
    setTemplatePertanyaan(template_pertanyaan) {
      this.template_pertanyaan = template_pertanyaan;
      return this;
    }
  
    /**
     * Mengatur link spreadsheet hasil.
     * @param {string} spreadsheet_hasil_link - Link spreadsheet hasil.
     * @returns {SoalIsianSingkatBuilder} Instance builder ini.
     */
    setSpreadsheetHasilLink(spreadsheet_hasil_link) {
      this.spreadsheet_hasil_link = spreadsheet_hasil_link;
      return this;
    }
  
    /**
     * Mengatur nama sheet hasil.
     * @param {string} sheet_hasil_name - Nama sheet hasil.
     * @returns {SoalIsianSingkatBuilder} Instance builder ini.
     */
    setSheetHasilName(sheet_hasil_name) {
      this.sheet_hasil_name = sheet_hasil_name;
      return this;
    }
  
    /**
     * Membangun instance SoalIsianSingkat.
     * @returns {SoalIsianSingkat} Instance SoalIsianSingkat yang baru.
     */
    build() {
      return new SoalIsianSingkat(this);
    }
  }