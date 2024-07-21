/**
 * Kelas AYRepository untuk mengelola data Amalan Yaumiyah dan Ngaji.
 * @class
 */
class AYRepository{

    /**
     * Membuat instance baru dari AYRepository.
     * @constructor
     */
    constructor(){
        this.sheet_name_reminder = getENV('AY_REMINDER_SHEET_NAME')
        this.sheet_range_reminder = getENV('AY_REMINDER_SHEET_RANGE')
        this.sheet_name_ngaji = getENV('AY_NGAJI_SHEET_NAME')

    }
    /**
     * mengambil info sheet dari reminder LMS
     * @returns {Object} terdiri dari sheet_name_reminder dan sheet_range_reminder
     */
    
    getInfoSheetRemider(){
        return {sheet_name_reminder: this.sheet_name_reminder, sheet_range_reminder: this.sheet_range_reminder}
    }
    /**
     * untuk nge ambil semua user yang belum buka LMS
     * @returns {Array}
     */
    getUsersNotSubmitAY  (){
        const arrDataRemind = SpreadsheetUtils.searchEntries({has_reminder_ay : false}, this.sheet_name_reminder, this.sheet_range_reminder);
        return arrDataRemind
    }
     
    /**
     * untuk nge ambil semua user yang belum buka LMS
     * @returns {Array}
     */
    getUsersNotNgajiToday  (){
        const arrDataRemind = SpreadsheetUtils.searchEntries({has_reminder_ngaji : false}, this.sheet_name_reminder, this.sheet_range_reminder);
        return arrDataRemind
    }
     
     /**
      * untuk ngambil status reminder tiap user
     * @param {number} id_telegram
     * @returns {Array}
     */
     getRemindStatusUserByIdTelegram(id_telegram) {
        const arr = SpreadsheetUtils.readEntryById(id_telegram, this.sheet_name_reminder, this.sheet_range_reminder)
        return arr
    }
    /** 
     * fungsi untuk nge update status remind LMS user
     * @param {number} id_telegram id telegram
     * @param {Array} arr array dari hasil function getRemindStatusByIdTelegram yang udah di update
     */
    updateStatusUserByIdTelegram  (id_telegram, arr){
        SpreadsheetUtils.updateEntryById(id_telegram, arr, this.sheet_name_reminder, this.sheet_range_reminder) 

    }
    /**
     * fungsi untuk nge reset status
     * @returns {number}
     */
    resetAllReminderStatus(){
        const sheet = SpreadsheetUtils.getSheetByName(this.sheet_name_reminder)
        // const sheet = MasterSpreadsheet.getSheetByName(LMSServices.sheet_name_reminder)
        const lr = sheet.getLastRow()
        for (let index = 2; index <= lr; index++) {

            //ay
            sheet.getRange(index,3).setValue(false)
            sheet.getRange(index,4).setValue(false)
            //ngaji
            sheet.getRange(index,5).setValue(false)
            sheet.getRange(index,6).setValue(false)

        }
        return lr
    }
    /**
     * Menambah user baru
     * @param {number} id_telegram 
     * @param {number} nim
     * @returns {number} baris terakhir
     */
    addNewUser(id_telegram, nim){
        return SpreadsheetUtils.createEntry([id_telegram,nim, false,false, false,false],this.sheet_name_reminder)
    }

    /**
     * @param {number} id_telegram 
     * @param {String} checkPointNgaji menggunakan format nomor surat:ayat terakhir contoh: 5:12 
     * @return {number} lastrow
     */
    addNgajiHarian(id_telegram, checkPointNgaji){


        
        const pattern = /(\d{1,3}):(\d{1,3})/g;

let match;
let no_surah 
let no_ayat 

while ((match = pattern.exec(checkPointNgaji)) !== null) {
   no_surah = match[1];
   no_ayat = match[2];
}


         try {
        
        
            const dataAyat  = JSON.parse(UrlFetchApp.fetch("https://api.alquran.cloud/v1/ayah/" +checkPointNgaji ))
            
            if (dataAyat["code"] == 200){
                SpreadsheetUtils.createEntry([new Date(), id_telegram, no_surah, no_ayat], this.sheet_name_ngaji)
                return { ayat: dataAyat["data"]["text"], surah: dataAyat["data"]["surah"]["name"], no_ayat : dataAyat["data"]["numberInSurah"], juz:dataAyat['data']['juz']} 
                
            }else{
                return "afwan"
            }
        } catch (error) {
            return error.message
            
        }
    }


}