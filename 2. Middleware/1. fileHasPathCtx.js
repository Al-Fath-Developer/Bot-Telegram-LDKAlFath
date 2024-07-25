/**
 * Middleware untuk menangani berbagai jenis file yang dikirim ke bot Telegram.
 * Setiap handler mengekstrak file_id dan mengatur ctx.url_file menggunakan FileUtils.
 */



bot.on("photo", ctx => {
    try {
        
   
    let idx_best_qulity = ctx.message.photo.length - 1;
    let id_photo = ctx.message.photo[idx_best_qulity].file_id;
    ctx.url_file = FileUtils.getFileUrlFromMsgBotTelegram(ctx.tg.token, id_photo);
    Logger.log("berhasil");
} catch (error) {
    errorLog(error)
}
}

);

bot.on("document", ctx => {
    try{
    let id_document = ctx.message.document.file_id;
    ctx.url_file = FileUtils.getFileUrlFromMsgBotTelegram(ctx.tg.token, id_document);
    ctx.filename = ctx.message.document.file_name;
    Logger.log("berhasil" + ctx.url_file);
} catch (error) {
    errorLog(error)
}
});

bot.on("audio", ctx => {
    try{
    let id_audio = ctx.message.audio.file_id;
    ctx.url_file = FileUtils.getFileUrlFromMsgBotTelegram(ctx.tg.token, id_audio);
    Logger.log("berhasil" + ctx.url_file);
} catch (error) {
    errorLog(error)
}
});

bot.on("video", ctx => {
    try{

    
    let id_video = ctx.message.video.file_id;
    ctx.url_file = FileUtils.getFileUrlFromMsgBotTelegram(ctx.tg.token, id_video);
    Logger.log("berhasil" + ctx.url_file);
} catch (error) {
    errorLog(error)
}
});
bot.on("video_note", ctx => {
    try{

    
    let id_video = ctx.message.video_note.file_id;
    ctx.url_file = FileUtils.getFileUrlFromMsgBotTelegram(ctx.tg.token, id_video);
    Logger.log("berhasil" + ctx.url_file);
} catch (error) {
    errorLog(error)
}
});
bot.on("voice", ctx => {
    try{

    
    let id_voice = ctx.message.voice.file_id;
    ctx.url_file = FileUtils.getFileUrlFromMsgBotTelegram(ctx.tg.token, id_voice);
    Logger.log("berhasil" + ctx.url_file);
} catch (error) {
    errorLog(error)
}
});


bot.on("voice", ctx => {
    try{
        
        let id_voice = ctx.message.voice.file_id;
        ctx.url_file = FileUtils.getFileUrlFromMsgBotTelegram(ctx.tg.token, id_voice);
        Logger.log("berhasil" + ctx.url_file);
    }
    catch (error) {
        errorLog(error)
    }
});
Logger.log("Loaded: fileHasPathCtx.js" + (new Date() - startTime) + "ms")