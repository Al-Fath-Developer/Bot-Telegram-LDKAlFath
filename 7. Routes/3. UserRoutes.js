

bot.cmd("myinfo", (ctx)=>{
    showTypingStatus(ctx)

    const user = UserUtils.registerRequired(ctx)
    ctx.reply("🪪Informasi Pribadi🪪")
    ctx.reply(user.printDataUser())
})

bot.cmd("updatemyinfo", (ctx)=>{
    showTypingStatus(ctx)

     const  user  = UserUtils.registerRequired(ctx)


    ctx.reply(user.printDataUser())
    return stage.enter("update");

})


bot.cmd("register", (ctx) => {
    showTypingStatus(ctx)

    return stage.enter("register");
});
Logger.log("Loaded UserRoutes.js" + (new Date() - startTime) + "ms")