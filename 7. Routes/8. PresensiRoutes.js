bot.cmd("jadiadminpresensi", (ctx)=>{
    UserUtils.registerRequired(ctx)
    
    return stage.enter("tambah_admin_presensi")
})