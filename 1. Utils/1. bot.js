
/**
 * Token bot Telegram untuk lingkungan pengembangan
 * @constant {string}
 */
const token_dev = getMapENV('BOT_API'); // Token bot harus diisi
/**
 * Inisialisasi bot Telegram menggunakan library lumpia
 * @constant {Object}
 */
const bot = new lumpia.init(token_dev);

const button = lumpia.button
const markup = lumpia.markup

/**
 * Destructuring komponen Scene dan Stage dari WizardDua
 * @constant {Object}
 */
const {Scene, Stage} = WizardDua;

/**
 * Objek Keyboard dari Builder
 * @constant {Object}
 */
const Keyboard = Builder.keyboard;
/**
 * ID log untuk bot
 * @type {number}
 */
bot.options.log_id = getMapENV('DEBUG_BOT_ID');

/**
 * Mengatur webhook untuk bot
 * @function
 */
function setWebHook() {
  let url = getMapENV('SCRIPT_URL');
  let result = bot.telegram.setWebhook(url);
  Logger.log(result);
}

/**
 * Menangani POST request
 * @function
 * @param {Object} e - Objek request
 */
function doPost(e) {

  try {
    const query = e.parameter.customApiQuery
    if(query != null){
      try {
        
        const payload = JSON.parse(e.postData.contents);  
        const response = APIRoutes(query,payload) 
        return ContentService.createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);
      } catch (error) {
        const response = {
          message : error.name,
          data: error.message
        }
        
        return ContentService.createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);
        
      }



    }else{

      /**
       * digunakan untuk nge filter klo misal ada kode yang ternyata itu rumus spreadsheet, bakal dijadiin string aja
     */
    
    
    bot.doPost(e);
const sheet_process_log = SpreadsheetUtils.MasterSpreadsheet.getSheetByName(getMapENV('LOG_PROCESS_SHEET_NAME'))

    sheet_process_log.appendRow([ startTime,new Date() - startTime,JSON.parse(e.postData.contents)?.message?.from?.id  || "" , Logger.getLog()]);

  }
  } catch (error) {
    errorLog(error)
    
  }
}

Logger.log("bot.js berhasil dimuat" + (new Date() - startTime) + "ms");