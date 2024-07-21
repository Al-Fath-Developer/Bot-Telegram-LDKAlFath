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
      sheet_error_log.appendRow([
        new Date(), 
        e.name,
        e.message,
        e.stack
      ]);
    } catch (logError) {
      console.error('Gagal mencatat error ke log:', logError);
      throw logError; // Melempar kembali error jika diperlukan
    }
  }
  