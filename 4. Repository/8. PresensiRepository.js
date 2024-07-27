class PresensiRepository {
  constructor() {
    this.spreadsheet_link = getMapENV('PRESENSI_SPREADSHEET_LINK');
    this.sheet_name = getMapENV('PRESENSI_LOG_ADMIN_SHEET_NAME');
  }
addAdminPresensi(arrData){
    return SpreadsheetUtils.appendRowDataToExternalSpreadsheet(this.spreadsheet_link, this.sheet_name, arrData)

}
 

}