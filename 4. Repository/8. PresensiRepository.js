class PresensiRepository {
  constructor() {
    this.spreadsheet_link = getMapENV('PRESENSI_SPREADSHEET_LINK');
    this.sheet_name = getMapENV('PRESENSI_LOG_ADMIN_SHEET_NAME');
    this.konfirmasi_kehadiran_sheet_name = getMapENV('PRESENSI_KONFIRMKEHADIRAN_KONFIG_SHEET_NAME');
    this.addAdminPresensi = this.addAdminPresensi.bind(this);
    this.getKonfigKonfirmasiKehadiran = this.getKonfigKonfirmasiKehadiran.bind(this);
    this.addKonfirmasiKehadiraPeserta = this.addKonfirmasiKehadiran.bind(this);
  }
addAdminPresensi(arrData){
    return SpreadsheetUtils.appendRowDataToExternalSpreadsheet(this.spreadsheet_link, this.sheet_name, arrData)

}
getKonfigKonfirmasiKehadiran(id_konfirm_kehadiran){
  const arrData = SpreadsheetUtils.readEntryByIdFromExternalSpreadsheet(id_konfirm_kehadiran,this.spreadsheet_link, this.konfirmasi_kehadiran_sheet_name, "A:E",false);
  
  if (arrData != null){

      return {id_konfirm_kehadiran: arrData[0], 
              nama_kegiatan_konfirm_kehadiran: arrData[1],
              link_spreadsheet_konfirm_kehadiran: arrData[2],
              sheet_name_konfirm_kehadiran: arrData[3],
              pesan: arrData[4]
            }
}else{
  return null
}
}
/**
 * 
 * @param {Array} arrData 
 * @param {String} spreadsheet_hasil_link 
 * @param {String} sheet_hasil_name 
 */  
addKonfirmasiKehadiran(arrData, spreadsheet_hasil_link, sheet_hasil_name){

  return SpreadsheetUtils.appendRowDataToExternalSpreadsheet(spreadsheet_hasil_link, sheet_hasil_name, arrData)


  


}

}