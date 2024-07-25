["photo", "document", "audio", "video", "video_note", "voice"].forEach(fileType => {
    bot.on(fileType, ctx => {
        UserUtils.registerRequired(ctx)
        ctx.reply("Sedang mengunggah file...")
    });});
Logger.log("Loaded: uploadFileMustRegister.js" + (new Date() - startTime) + "ms")