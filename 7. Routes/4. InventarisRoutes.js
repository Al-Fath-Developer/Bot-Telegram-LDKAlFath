bot.cmd("konfirmasiinventaris", (ctx)=>{
    UserUtils.registerRequired(ctx)

    return stage.enter("konfirmasi_inventaris_sekre");

 
})
Logger.log("Loaded InventarisRoutes.js" + (new Date() - startTime) + "ms")