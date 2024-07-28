/**
 * Kumpulan utilitas untuk menangani operasi file.
 */
const FileUtils = {
    giveAccessToEmail(idOrUrl, email)  {
 const file_id =        FileUtils.extractId(idOrUrl);
        DriveApp.getFileById(file_id).addEditor(email);
        
    },
     extractId(idOrUrl) {
        const urlPattern = /[-\w]{25,}/;
        const match = idOrUrl.match(urlPattern);
        return match ? match[0] : idOrUrl;
      },
      
  /**
     * Mendapatkan URL file dari pesan bot Telegram.
     * @param {string} bot_token - Token bot Telegram.
     * @param {string} fileId - ID file yang dikirim melalui Telegram.
     * @returns {string} URL file yang dapat diakses.
     */
     getFileUrlFromMsgBotTelegram: (bot_token, fileId)=> {
        let url_to_path = "https://api.telegram.org/bot" + bot_token + "/getFile?file_id=" + fileId;
        let json_to_path = UrlFetchApp.fetch(url_to_path);
        let file_path = JSON.parse(json_to_path)["result"]["file_path"];
        let url_file = "https://api.telegram.org/file/bot" + bot_token + "/" + file_path;
        return url_file;
},
 /**
     * Menyimpan file ke Google Drive.
     * @param {string} url_file - URL file yang akan disimpan.
     * @param {string} username - Nama pengguna yang mengirim file.
     * @param {string} [caption=""] - Keterangan file (opsional).
     * @returns {string} ID file yang disimpan di Google Drive.
     */
 saveFileToDrive : (url_file, username, caption = "")=> {
    
    let blob = UrlFetchApp.fetch(url_file).getBlob()
    let id = DriveApp.createFile(blob).setName(caption + "|" + username).moveTo(DriveApp.getFolderById(getMapENV('USER_FILES_FOLDER_ID'))).getId();
    return id;
},
    getDriveURLFromCtx(ctx, folder_id, file_name, email = null) {
        showBotStatus(ctx)
        if(ctx.message.document || ctx.message.photo || ctx.message.audio || ctx.message.video || ctx.message.voice || ctx.message.video_note || ctx.message.animation || ctx.message.sticker){
            let file_id;
            
            if(ctx.message.document) file_id = ctx.message.document.file_id;
            if(ctx.message.photo) file_id = ctx.message.photo[ctx.message.photo.length - 1].file_id;
            if(ctx.message.audio) file_id = ctx.message.audio.file_id;
            if(ctx.message.video) file_id = ctx.message.video.file_id;
            if(ctx.message.voice) file_id = ctx.message.voice.file_id;
            if(ctx.message.video_note) file_id = ctx.message.video_note.file_id;
            if(ctx.message.animation) file_id = ctx.message.animation.file_id;
            if(ctx.message.sticker) file_id = ctx.message.sticker.file_id;
            
            const url_file = FileUtils.getFileUrlFromMsgBotTelegram(ctx.tg.token, file_id);
            const drive_id = FileUtils.saveFileToDrive(url_file, ctx.from.username, file_name);
            if(email){
                DriveApp.getFileById(drive_id).addEditor(email);
            }
            return DriveApp.getFileById(drive_id).moveTo(DriveApp.getFolderById(folder_id)).getUrl();
        } else {
            return null;
        }
    }

}
Logger.log("Loaded: FileUtils.js" + (new Date() - startTime) + "ms")