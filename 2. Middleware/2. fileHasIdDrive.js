/**
 * Middleware untuk menghandle file yang dikirim oleh pengguna dan menyimpannya di Google Drive.
 * File akan diberi nama dengan format "caption|firstname" dan disimpan di folder "folder_user_files".
 */



bot.on("photo", ctx => {
    const caption = ctx.message.caption || "";
    ctx.drive_id = FileUtils.saveFileToDrive(ctx.url_file, ctx.from.username, caption);
})

bot.on("video", ctx => {
    const caption = ctx.message.caption || "";
    ctx.drive_id = FileUtils.saveFileToDrive(ctx.url_file, ctx.from.username, caption);
})

bot.on("voice", ctx => {
    const caption = ctx.message.caption || "";
    ctx.drive_id = FileUtils.saveFileToDrive(ctx.url_file, ctx.from.username, caption);
})

bot.on("audio", ctx => {
    const caption = ctx.message.caption || "";
    ctx.drive_id = FileUtils.saveFileToDrive(ctx.url_file, ctx.from.username, caption);
})

bot.on("document", ctx => {
    const filename = ctx.filename
    let blob = UrlFetchApp.fetch(ctx.url_file).getBlob()
    let id = DriveApp.createFile(blob).moveTo(folder_user_files).setName(filename).getId();
    ctx.drive_id = id;
})