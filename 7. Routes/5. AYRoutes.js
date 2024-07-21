const ayControllers = new AYControllers()
// ??
bot.hear(/#chxNgaji\s+([^\s]+)/g, (ctx) =>{
    UserUtils.registerRequired(ctx)

    ayControllers.addKonfirmNgaji(ctx)
    

})