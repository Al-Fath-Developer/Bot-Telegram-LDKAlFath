/**
 * Mendengarkan perintah untuk melihat soal.
 * @param {Object} ctx - Konteks dari perintah.
 */
bot.hear(/#lihatSoal\s+([^\s]+)/g, (ctx) =>{
    showTypingStatus(ctx)

    soalIsianSingkatControllers.showSoal(ctx)
})

/**
 * Mendengarkan perintah untuk menjawab soal.
 * @param {Object} ctx - Konteks dari perintah.
 * @returns {Object} - Objek stage untuk memasuki mode menjawab soal.
 */
bot.hear(/#jawabsoal\s+([^\s]+)/g, (ctx) =>{
    showTypingStatus(ctx)

    UserUtils.registerRequired(ctx)
    return stage.enter("jawab_soal");
})

/**
 * Mendengarkan perintah untuk menjawab soal sebagai tamu.
 * @param {Object} ctx - Konteks dari perintah.
 * @returns {Object} - Objek stage untuk memasuki mode menjawab soal sebagai tamu.
 */
bot.hear(/#jawabsoalguest\s+([^\s]+)/g, (ctx) =>{
    showTypingStatus(ctx)

    return stage.enter("jawab_soal_guest");
})
Logger.log("Loaded SoalIsianSingkatRoutes.js" + (new Date() - startTime) + "ms")