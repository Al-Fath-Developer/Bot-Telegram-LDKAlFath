// Import libraries
// Import Google Sheets library

/**
 * Fungsi ini digunakan untuk antisipasi jika ada user yang mengirimkan formula atau rumus supaya di beri komentar agar tidak langsung bisa dijalankan
 * note: kalau bisa ini fungsi dijalankan di semua session juga
 * @param {string} value 
 * @returns string
 */
function sanitizeForCSV(value) {
    
    if (typeof value === 'string' && /^[=+\-@]/.test(value)) {
      return `'${value}`;
    }
    return value;
  
}
  
/**
 * Fungsi umum untuk mengekstrak informasi pengguna
 * @param {Object} ctx - Objek konteks
 * @returns {Object} Informasi pengguna
 */
function extractUserInfo(ctx) {
    return {
      username: ctx.from.username,
      fullname: `${ctx.from.first_name} ${ctx.from.last_name}`,
      user_id: ctx.from.id
    };
  }

  
/**
 * Fungsi umum untuk mencatat pesan teks
 * @param {Object} userInfo - Informasi pengguna
 * @param {string} text - Teks yang akan dicatat
 * @param {string} [drive_id] - ID Drive opsional
 */
function logTextMessage(userInfo, text, drive_id) {
  try {
    text = sanitizeForCSV(text)

    const { user_id, username, fullname } = userInfo;
    const logData = [new Date(), user_id, username, fullname, text];
    if (drive_id) logData.push(drive_id);
    sheet_text_log.appendRow(logData);
  } catch (error) {
    errorLog(error);
  }
}

/**
 * Fungsi umum untuk mencatat file
 * @param {Object} userInfo - Informasi pengguna
 * @param {string} fileType - Jenis file (photo, document, audio, video)
 * @param {Object} fileInfo - Informasi file
 */
function logFileMessage(userInfo, fileType, fileInfo) {
  try {
    fileInfo.name = sanitizeForCSV(fileInfo.name)

    const { user_id, username, fullname } = userInfo;
    sheet_file_log.appendRow([
      new Date(), user_id, username, fullname,
      fileInfo.name, fileInfo.size, fileInfo.type, fileInfo.url
    ]);
  } catch (error) {
    errorLog(error);
  }
}

// Event handlers
bot.on("text", ctx => {
  const userInfo = extractUserInfo(ctx);
  logTextMessage(userInfo, ctx.message.text);
});

bot.on("caption", ctx => {
  if (ctx.drive_id) {
    const userInfo = extractUserInfo(ctx);
    logTextMessage(userInfo, ctx.message.caption, ctx.drive_id);
  }
});

["photo", "document", "audio", "video"].forEach(fileType => {
  bot.on(fileType, ctx => {
    const userInfo = extractUserInfo(ctx);
    const file = DriveApp.getFileById(ctx.drive_id);
    const fileInfo = {
      url: file.getUrl(),
      name: file.getName(),
      size: file.getSize(),
      type: file.getMimeType()
    };
    logFileMessage(userInfo, fileType, fileInfo);
  });
});