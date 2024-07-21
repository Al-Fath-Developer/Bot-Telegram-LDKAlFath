
/**
 * Token bot Telegram untuk lingkungan pengembangan
 * @constant {string}
 */
const token_dev = getENV('BOT_API'); // Token bot harus diisi
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
bot.options.log_id = getENV('DEBUG_BOT_ID');

/**
 * Mengatur webhook untuk bot
 * @function
 */
function setWebHook() {
  let url = getENV('SCRIPT_URL');
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
  }
  } catch (error) {
    errorLog(error)
  }
}

// function temporaryLoadingMessage(ctx){
//   const loading_message = ctx.reply("Tunggu sebentar...")
//   ctx.deleteMessage(loading_message.result.message_id)



// }
//Keyboard
// var keyboard = Keyboard.reply(['Laki-laki', 'Perempuan'])
//         keyboard.reply_markup.one_time_keyboard= true

// Logger.log(keyboard)
//     ctx.reply("Jenis Kelamin: ", keyboard);


// Jalankan: > (clasp push) -dan (clasp deploy --deploymentId AKfycbyG-foUc2w-h6dbSqU6lu5HMRjCaloK5_dvYaWQe5hQvoOzgIiabVCzGJ1s8mto9Ys)

