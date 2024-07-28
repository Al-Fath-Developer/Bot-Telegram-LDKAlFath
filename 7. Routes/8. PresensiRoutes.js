bot.cmd("jadiadminpresensi", (ctx)=>{
    showTypingStatus(ctx)

    UserUtils.registerRequired(ctx)
    
    return stage.enter("tambah_admin_presensi")
})