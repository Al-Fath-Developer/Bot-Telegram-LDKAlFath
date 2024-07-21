// ??
bot.hear(/#lihatSoal\s+([^\s]+)/g, (ctx) =>{
    soalIsianSingkatControllers.showSoal(ctx)
    

})

bot.hear(/#jawabsoal\s+([^\s]+)/g, (ctx) =>{
    UserUtils.registerRequired(ctx)

    return stage.enter("jawab_soal");
    

})

bot.hear(/#jawabsoalguest\s+([^\s]+)/g, (ctx) =>{

    return stage.enter("jawab_soal_guest");
    

})