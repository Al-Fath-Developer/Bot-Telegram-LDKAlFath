/**
 * Middleware untuk menghandle file yang dikirim oleh pengguna dan menyimpannya di Google Drive.
 * File akan diberi nama dengan format "caption|firstname" dan disimpan di folder "DriveApp.getFolderById(getMapENV('USER_FILES_FOLDER_ID'))".
 */



bot.on("photo", ctx => {
    showBotStatus(ctx)
    const caption = ctx.message.caption || "";
    ctx.drive_id = FileUtils.saveFileToDrive(ctx.url_file, ctx.from.username, caption);
})

bot.on("video", ctx => {
    showBotStatus(ctx)

    const caption = ctx.message.caption || "";
    ctx.drive_id = FileUtils.saveFileToDrive(ctx.url_file, ctx.from.username, caption);
})
bot.on("video_note", ctx => {
    showBotStatus(ctx)

    const caption = ctx.message.caption || "Video Note";
    ctx.drive_id = FileUtils.saveFileToDrive(ctx.url_file, ctx.from.username, caption);
})

bot.on("voice", ctx => {
    showBotStatus(ctx)

    const caption = ctx.message.caption || "Voice Note";
    ctx.drive_id = FileUtils.saveFileToDrive(ctx.url_file, ctx.from.username, caption);
})

bot.on("audio", ctx => {
    showBotStatus(ctx)

    const caption = ctx.message.caption || "";
    ctx.drive_id = FileUtils.saveFileToDrive(ctx.url_file, ctx.from.username, caption);
})

bot.on("document", ctx => {
    showBotStatus(ctx)

    const caption = ctx.message.caption || "";

    const filename = ctx.filename + "|" + caption;
    let blob = UrlFetchApp.fetch(ctx.url_file).getBlob()
    let id = DriveApp.createFile(blob).moveTo(DriveApp.getFolderById(getMapENV('USER_FILES_FOLDER_ID'))).setName(filename).getId();
    ctx.drive_id = id;
})
Logger.log("Loaded: fileHasIdDrive.js" + (new Date() - startTime) + "ms")