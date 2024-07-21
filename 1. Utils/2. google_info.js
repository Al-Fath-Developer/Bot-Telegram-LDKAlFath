// Mendapatkan spreadsheet aktif
const MasterSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
const sheet_text_log = MasterSpreadsheet.getSheetByName(getENV('LOG_TEXT_SHEET_NAME'))
const sheet_file_log = MasterSpreadsheet.getSheetByName(getENV('LOG_FILE_SHEET_NAME'))
const sheet_error_log = MasterSpreadsheet.getSheetByName(getENV('LOG_ERROR_SHEET_NAME'))

const id_folder_user_files = getENV('USER_FILES_FOLDER_ID')
const folder_user_files = DriveApp.getFolderById(id_folder_user_files)
// const sheet_users = MasterSpreadsheet.getSheetByName("Users")
