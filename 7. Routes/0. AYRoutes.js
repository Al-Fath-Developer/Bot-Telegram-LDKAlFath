const ayControllers = new AYControllers()
// ??
bot.hear(/#chxNgaji\s+([^\s]+)/g, (ctx) =>{
    UserUtils.registerRequired(ctx)

    ayControllers.addKonfirmNgaji(ctx)
    

})
bot.hear(/#getQS\s+([^\s]+)/g, (ctx) =>{

    ayControllers.getAyatToPage(ctx)
    

})
bot.hear(/#getAyat\s+([^\s]+)/g, (ctx) =>{

    ayControllers.getAyat(ctx)
    

})
bot.action('next_ayat', (ctx)=>{
    ayat_from_user =  TextUtils.getRegexResult(ctx.update.callback_query.message.text)[0]
    ayat_from_user++

    return    ayControllers.getAyat(ctx, ayat_from_user)

})
bot.action('prev_ayat', (ctx)=>{
    ayat_from_user =  TextUtils.getRegexResult(ctx.update.callback_query.message.text)[0]
    ayat_from_user--

    return    ayControllers.getAyat(ctx, ayat_from_user)

})
bot.action('next_page_alquran', (ctx)=>{
    page_from_user =  TextUtils.getRegexResult(ctx.update.callback_query.message.text)[0]
    page_from_user++

    return    ayControllers.getPage(ctx, page_from_user)

})
bot.action('prev_page_alquran', (ctx)=>{
    page_from_user =  TextUtils.getRegexResult(ctx.update.callback_query.message.text)[0]
    page_from_user--

    return    ayControllers.getPage(ctx, page_from_user)

})
bot.action('start_quran', (ctx)=>{
    

    return    ayControllers.getPage(ctx, 1)

})
bot.action('start_kajian', (ctx)=>{
    return ayControllers.getKajian(ctx)
}   )
Logger.log("Loaded AYRoutes.js" + (new Date() - startTime) + "ms")