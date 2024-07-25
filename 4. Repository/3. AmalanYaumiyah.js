/**
 * Kelas AYRepository untuk mengelola data Amalan Yaumiyah dan Ngaji.
 * @class
 */
/**
 * Represents the AYRepository class.
 * @class
 */
class AYRepository{

    /**
     * Creates a new instance of AYRepository.
     * @constructor
     */
    constructor(){
        this.sheet_name_reminder = getMapENV('AY_REMINDER_SHEET_NAME')
        this.sheet_range_reminder = getMapENV('AY_REMINDER_SHEET_RANGE')
        this.sheet_name_ngaji = getMapENV('AY_NGAJI_SHEET_NAME')
        this.spreadsheet_link = getMapENV('AY_SPREADSHEET_LINK')

    }
    /**
     * Retrieves information about the reminder sheet from LMS.
     * @returns {Object} - An object containing the sheet name and range for the reminder.
     */
    
    getInfoSheetRemider(){
        return {sheet_name_reminder: this.sheet_name_reminder, sheet_range_reminder: this.sheet_range_reminder}
    }
    /**
     * Retrieves all users who have not submitted AY.
     * @returns {Array} - An array of users who have not submitted AY.
     */
    getUsersNotSubmitAY  (){
        const arrDataRemind = SpreadsheetUtils.searchEntries({has_reminder_ay : false}, this.sheet_name_reminder, this.sheet_range_reminder);
        return arrDataRemind
    }
     
    /**
     * Retrieves all users who have not performed Ngaji today.
     * @returns {Array} - An array of users who have not performed Ngaji today.
     */
    getUsersNotNgajiToday  (){
        const arrDataRemind = SpreadsheetUtils.searchEntries({has_reminder_ngaji : false}, this.sheet_name_reminder, this.sheet_range_reminder);
        return arrDataRemind
    }
     
     /**
      * Retrieves the reminder status for a user by their Telegram ID.
      * @param {number} id_telegram - The Telegram ID of the user.
      * @returns {Array} - An array containing the reminder status for the user.
      */
     getRemindStatusUserByIdTelegram(id_telegram) {
        const arr = SpreadsheetUtils.readEntryById(id_telegram, this.sheet_name_reminder, this.sheet_range_reminder)
        return arr
    }
    /** 
     * Updates the reminder status for a user by their Telegram ID.
     * @param {number} id_telegram - The Telegram ID of the user.
     * @param {Array} arr - An array containing the updated reminder status.
     */
    updateStatusUserByIdTelegram  (id_telegram, arr){
        SpreadsheetUtils.updateEntryById(id_telegram, arr, this.sheet_name_reminder, this.sheet_range_reminder) 

    }
    /**
     * Resets the status of all reminders.
     * @returns {number} - The last row number.
     */
    resetAllReminderStatus(){
        const sheet = SpreadsheetUtils.getSheetByName(this.sheet_name_reminder)
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
     * Adds a new user.
     * @param {number} id_telegram - The Telegram ID of the user.
     * @param {number} nim - The NIM of the user.
     * @returns {number} - The last row number.
     */
    addNewUser(id_telegram, nim){
        return SpreadsheetUtils.createEntry([id_telegram,nim, false,false, false,false],this.sheet_name_reminder)
    }

    /**
     * Adds daily Ngaji for a user.
     * @param {number} id_telegram - The Telegram ID of the user.
     * @param {String} checkPointNgaji - The checkpoint for Ngaji in the format "surah:ayat", e.g., "5:12".
     * @return {number} - The last row number.
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
            const dataAyat = JSON.parse(ExternalDataUtils.fetchDataWithCache("https://api.alquran.cloud/v1/ayah/" +checkPointNgaji+"/ar.shaatree", "ayat_" +checkPointNgaji, 200))
            // const dataAyat  = JSON.parse(UrlFetchApp.fetch("https://api.alquran.cloud/v1/ayah/" +checkPointNgaji+"/ar.shaatree" ))
            
            if (dataAyat["code"] == 200){
                SpreadsheetUtils.appendRowDataToExternalSpreadsheet(this.spreadsheet_link, this.sheet_name_ngaji, [new Date(), id_telegram, no_surah, no_ayat])
                return { audio: dataAyat['data']['audio'] || dataAyat['data']['audioSecondary'], page: dataAyat['data']['page'], ayat: dataAyat["data"]["text"], surah: dataAyat["data"]["surah"]["name"], no_ayat : dataAyat["data"]["numberInSurah"], juz:dataAyat['data']['juz'], no_ayat_in_alquran: dataAyat["data"]["number"]} 
            }else{
                return "afwan"
            }
        } catch (error) {
            return error.message
        }
    }

    /**
     * Retrieves the Ayat based on the Ayat number.
     * @param {number} no_ayat - The Ayat number.
     * @returns {Object} - An object containing the page, Ayat text, Surah name, Ayat number, Juz, and Ayat number in the Quran.
     */
    getAyat(no_ayat){
        try {
            const dataAyat = JSON.parse(ExternalDataUtils.fetchDataWithCache("https://api.alquran.cloud/v1/ayah/" +no_ayat +"/ar.shaatree", "ayat_" +no_ayat, 200))
            // const dataAyat  = JSON.parse(UrlFetchApp.fetch("https://api.alquran.cloud/v1/ayah/" +no_ayat +"/ar.shaatree"))
            return { audio: dataAyat['data']['audio'] || dataAyat['data']['audioSecondary'], page: dataAyat['data']['page'], ayat: dataAyat["data"]["text"], surah: dataAyat["data"]["surah"]["name"], no_ayat : dataAyat["data"]["numberInSurah"], juz:dataAyat['data']['juz'], no_ayat_in_alquran: dataAyat["data"]["number"]} 
        } catch (error) {
            return error.message
        }
    }

    /**
     * Retrieves the page of the Quran.
     * @param {number} page - The page number.
     * @returns {Object} - An object containing the page number, texts, number of Ayahs, and Surah names.
     */
    getPageAlQuran(page){
        try {
            let i = 0
            const dataLatin = JSON.parse(ExternalDataUtils.fetchDataWithCache("https://api.alquran.cloud/v1/page/" +page +"/en.transliteration", "latin_page_" +page, 200))
            // const dataLatin = JSON.parse(UrlFetchApp.fetch("https://api.alquran.cloud/v1/page/" +page +"/en.transliteration"))
            const dataAyat  = JSON.parse(ExternalDataUtils.fetchDataWithCache("https://api.alquran.cloud/v1/page/" +page+"/ar.shaatree", "page_" +page, 200))
            // const dataAyat  = JSON.parse(UrlFetchApp.fetch("https://api.alquran.cloud/v1/page/" +page+"/ar.shaatree" ))
            const result = {}
            result.juz = dataAyat['data']['ayahs'][0]['juz']
            result.page = dataAyat['data']['number']
            result.ayahs = dataAyat['data']['ayahs'].map(ayah => {

                return { audio: ayah['audio'] || ayah['audioSecondary'], ayah: ayah["text"], surah: ayah["surah"]["englishName"], no_ayah: ayah["numberInSurah"], latin : dataLatin["data"]["ayahs"][i++]["text"]}

            })
           
            return result
        } catch (error) {
            return error.message
        }
    }
}

Logger.log("Loaded AYRepository.js" + (new Date() - startTime) + "ms")