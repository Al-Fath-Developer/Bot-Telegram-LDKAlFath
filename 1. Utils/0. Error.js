class UserInputError extends Error{
    constructor(message, recommendation = "Silahkan hubungi Admin"){
        super(message)
        this.recommendation =recommendation
            this.name = "UserInputError";


    }
}
/**
 * Mencatat informasi error ke dalam spreadsheet.
 * 
 * @param {Error} e - Objek Error yang akan dicatat.
 * @throws {Error} Jika terjadi kesalahan saat mencatat ke spreadsheet.
 */
function errorLog(e) {
    try {
      const sheet_error_log = SpreadsheetUtils.MasterSpreadsheet.getSheetByName(getMapENV('LOG_ERROR_SHEET_NAME'))

      sheet_error_log.appendRow([
        new Date(), 
        e.name,
        e.message,
        e.stack,
        Logger.getLog()
      ]);
    } catch (logError) {
      console.error('Gagal mencatat error ke log:', logError);
      throw logError; // Melempar kembali error jika diperlukan
    }
  }
  
  Logger.log("Error.js berhasil dimuat" + (new Date() - startTime) + "ms");