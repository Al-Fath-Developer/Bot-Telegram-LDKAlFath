bot.cmd("jadiadminpresensi", (ctx)=>{
    showTypingStatus(ctx)

    UserUtils.registerRequired(ctx)
    
    return stage.enter("tambah_admin_presensi")
})

bot.hear(/#konfirmasikehadiran\s+([^\s]+)/g, (ctx) =>{
    showTypingStatus(ctx)

    UserUtils.registerRequired(ctx)
    return stage.enter("konfirmasi_kehadiran_peserta");
})
