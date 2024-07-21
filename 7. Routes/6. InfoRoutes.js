const infoControllers = new InfoControllers()
bot.cmd("infofitur", (ctx)=>{
    return infoControllers.getListFeature(ctx);
})
bot.action("list_fitur", (ctx)=>{

    return infoControllers.getListFeature(ctx);
})

bot.action('about_dev', (ctx)=>{
    return infoControllers.getAboutDev(ctx)
})
bot.action('visi_misi', (ctx)=>{
    return infoControllers.getVisiMisi(ctx)
})
bot.action('main_menu', (ctx)=>{
    UserUtils.registerOptional(ctx)

    return infoControllers.getMenuStart(ctx)
})
bot.action('kritik_saran_bot', (ctx)=>{
    return infoControllers.getKritikSaran(ctx)
})
bot.start(ctx=>{
    UserUtils.registerOptional(ctx)
    return infoControllers.getMenuStart(ctx)
  })