/**
 * Kumpulan utilitas untuk menangani operasi file.
 */
const FileUtils = {
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
    let id = DriveApp.createFile(blob).setName(caption + "|" + username).moveTo(folder_user_files).getId();
    return id;
}
}